import { useQuery } from "@tanstack/react-query";
import { FC, Fragment, useMemo, useState } from "react";
import supabase from "src/supabase/client";
import { Spinner } from "../../Spinner";
import { CopartFinalBetRangeDataItem } from "./CopartFinalBetRangeDataItem";
import { FinalBetRangeType } from "src/types";
import { CopartFinalBetRangeEditModal } from "./CopartFinalBetRangeEditModal";

export const CopartFinalBetRangeData: FC = () => {
  const [editing, setEditing] = useState<FinalBetRangeType | undefined>(
    undefined,
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleCloseModal = (): void => {
    setIsModalOpen(!isModalOpen);
    setEditing(undefined);
  };
  const {
    data: copartBetRanges,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["copartFinalBetRange"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("copartFinalBetRange")
        .select("*");
      if (error) throw error;
      return data as FinalBetRangeType[];
    },
    refetchOnWindowFocus: false,
  });

  const copartBetRangesData = useMemo(() => {
    return (copartBetRanges ?? [])
      .filter((item) => item.min >= 0)
      .sort((a, b) => a.min - b.min);
  }, [copartBetRanges]);

  if (isLoading) return <Spinner />;

  return (
    <Fragment>
      <h1 className="uppercase text-2xl mb-6 font-semibold">
        Copart final bet range
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 flex-wrap">
        {copartBetRangesData.map((copartBetRangeItem) => (
          <CopartFinalBetRangeDataItem
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            editing={editing}
            setEditing={setEditing}
            copartBetRangeItem={copartBetRangeItem}
            key={copartBetRangeItem.id}
          />
        ))}
      </div>
      {isModalOpen && (
        <CopartFinalBetRangeEditModal
          refetch={refetch}
          onClose={handleCloseModal}
          editRange={editing}
        />
      )}
    </Fragment>
  );
};
