import { useQuery } from "@tanstack/react-query";
import { FC, Fragment, useMemo, useState } from "react";
import supabase from "src/supabase/client";
import { Spinner } from "../../Spinner";
import { IAAIbetsInRealTimeDataItem } from "./IAAIbetsInRealTimeDataItem";
import { BetInRealTimeType } from "src/types";
import { IAAIbetsInRealTimeEditModal } from "./IAAIbetsInRealTimeEditModal";

export const IAAIbetsInRealTimeData: FC = () => {
  const [editing, setEditing] = useState<BetInRealTimeType | undefined>(
    undefined,
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleCloseModal = (): void => {
    setIsModalOpen(!isModalOpen);
    setEditing(undefined);
  };
  const {
    data: IAAIbetsInRealTime,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["IAAIbetsInRealTime"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("IAAIbetsInRealTime")
        .select("*");
      if (error) throw error;
      return data as BetInRealTimeType[];
    },
    refetchOnWindowFocus: false,
  });

  const IAAIbetsInRealTimeData = useMemo(() => {
    return (IAAIbetsInRealTime ?? [])
      .filter((item) => item.min >= 0)
      .sort((a, b) => a.min - b.min);
  }, [IAAIbetsInRealTime]);

  if (isLoading) return <Spinner />;

  return (
    <Fragment>
      <h1 className="uppercase text-2xl mb-6 font-semibold">
        IAAI bets in real time
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 flex-wrap">
        {IAAIbetsInRealTimeData.map((IAAIbetsInRealTimeItem) => (
          <IAAIbetsInRealTimeDataItem
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            editing={editing}
            setEditing={setEditing}
            IAAIbetsInRealTimeItem={IAAIbetsInRealTimeItem}
            key={IAAIbetsInRealTimeItem.id}
          />
        ))}
      </div>
      {isModalOpen && (
        <IAAIbetsInRealTimeEditModal
          refetch={refetch}
          onClose={handleCloseModal}
          editBet={editing}
        />
      )}
    </Fragment>
  );
};
