import { useQuery } from "@tanstack/react-query";
import { FC, Fragment, useMemo, useState } from "react";
import supabase from "src/supabase/client";
import { Spinner } from "../../Spinner";
import { IAAIfinalBetRangeDataItem } from "./IAAIfinalBetRangeDataItem";
import { FinalBetRangeType } from "src/types";
import { IAAIfinalBetRangeEditModal } from "./IAAIfinalBetRangeEditModal";

export const IAAIfinalBetRangeData: FC = () => {
  const [editing, setEditing] = useState<FinalBetRangeType | undefined>(
    undefined,
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleCloseModal = (): void => {
    setIsModalOpen(!isModalOpen);
    setEditing(undefined);
  };
  const {
    data: IAAIfinalBetRanges,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["IAAIfinalBetRange"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("IAAIfinalBetRange")
        .select("*");
      if (error) throw error;
      return data as FinalBetRangeType[];
    },
    refetchOnWindowFocus: false,
  });

  const IAAIfinalBetRangesData = useMemo(() => {
    return (IAAIfinalBetRanges ?? [])
      .filter((item) => item.min >= 0)
      .sort((a, b) => a.min - b.min);
  }, [IAAIfinalBetRanges]);

  if (isLoading) return <Spinner />;

  return (
    <Fragment>
      <h1 className="uppercase text-2xl mb-6 font-semibold">
        IAAI final bet range
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 flex-wrap">
        {IAAIfinalBetRangesData.map((IAAIfinalBetRangeItem) => (
          <IAAIfinalBetRangeDataItem
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            editing={editing}
            setEditing={setEditing}
            IAAIfinalBetRangeItem={IAAIfinalBetRangeItem}
            key={IAAIfinalBetRangeItem.id}
          />
        ))}
      </div>
      {isModalOpen && (
        <IAAIfinalBetRangeEditModal
          refetch={refetch}
          onClose={handleCloseModal}
          editRange={editing}
        />
      )}
    </Fragment>
  );
};
