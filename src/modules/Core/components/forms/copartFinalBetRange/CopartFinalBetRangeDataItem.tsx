import { FC } from "react";
import { edit } from "src/static/icons";
import { FinalBetRangeType } from "src/types";
import { formatTimestamp } from "src/utils";

export type CopartFinalBetRangeDataItemProps = {
  editing: FinalBetRangeType | undefined;
  setEditing: (item: FinalBetRangeType) => void;
  copartBetRangeItem: FinalBetRangeType;
  setIsModalOpen: (value: boolean) => void;
  isModalOpen: boolean;
};

export const CopartFinalBetRangeDataItem: FC<
  CopartFinalBetRangeDataItemProps
> = ({
  copartBetRangeItem,
  editing,
  setEditing,
  setIsModalOpen,
  isModalOpen,
}) => {
  return (
    <div
      className={`flex group relative items-start justify-between flex-col ${copartBetRangeItem.id === editing?.id ? "bg-blue-300/50" : "bg-white/50"} p-2 rounded-md shadow-md`}
    >
      <div className="text-lg font-semibold">
        {copartBetRangeItem.min} - {copartBetRangeItem.max}
      </div>
      <div className="text-base font-normal">
        {copartBetRangeItem.feeAmount !== null
          ? copartBetRangeItem.feeAmount
          : `${copartBetRangeItem.feeAmountInPercent}%`}
      </div>
      <div className="text-xs font-normal">
        Last update: {formatTimestamp(copartBetRangeItem.updated_at)}
      </div>
      <button
        onClick={() => {
          setEditing(copartBetRangeItem);
          setIsModalOpen(!isModalOpen);
        }}
        className="group-hover:block hidden absolute top-2 right-2 size-4 cursor-pointer shadow-2xs"
      >
        <img src={edit} alt="edit" />
      </button>
    </div>
  );
};
