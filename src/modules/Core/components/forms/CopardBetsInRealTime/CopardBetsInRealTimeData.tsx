import { useQuery } from "@tanstack/react-query";
import { FC, Fragment, useMemo, useState } from "react";
import supabase from "src/supabase/client";
import { Spinner } from "../../Spinner";
import { CopardBetsInRealTimeDataItem } from "./CopardBetsInRealTimeDataItem";
import { BetInRealTimeType } from "src/types";
import { CopardBetsInRealTimeEditModal } from "./CopardBetsInRealTimeEditModal";

export const CopardBetsInRealTimeData: FC = () => {
  const [editing, setEditing] = useState<BetInRealTimeType | undefined>(
    undefined,
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleCloseModal = (): void => {
    setIsModalOpen(!isModalOpen);
    setEditing(undefined);
  };
  const {
    data: copardBetsInRealTime,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["copardBetsInRealTime"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("copardBetsInRealTime")
        .select("*");
      if (error) throw error;
      return data as BetInRealTimeType[];
    },
    refetchOnWindowFocus: false,
  });

  const copardBetsInRealTimeData = useMemo(() => {
    return (copardBetsInRealTime ?? [])
      .filter((item) => item.min >= 0)
      .sort((a, b) => a.min - b.min);
  }, [copardBetsInRealTime]);

  if (isLoading) return <Spinner />;

  return (
    <Fragment>
      <h1 className="uppercase text-2xl mb-6 font-semibold">
        Copart bets in real time
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 flex-wrap">
        {copardBetsInRealTimeData.map((copardBetsInRealTimeItem) => (
          <CopardBetsInRealTimeDataItem
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            editing={editing}
            setEditing={setEditing}
            copardBetsInRealTimeItem={copardBetsInRealTimeItem}
            key={copardBetsInRealTimeItem.id}
          />
        ))}
      </div>
      {isModalOpen && (
        <CopardBetsInRealTimeEditModal
          refetch={refetch}
          onClose={handleCloseModal}
          editBet={editing}
        />
      )}
    </Fragment>
  );
};
