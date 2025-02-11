import { FC } from "react";
import { edit } from "src/static/icons";
import { FinalBetRangeType } from "src/types";
import { formatTimestamp } from "src/utils";

export type IAAIfinalBetRangeDataItemProps = {
  editing: FinalBetRangeType | undefined;
  setEditing: (item: FinalBetRangeType) => void;
  IAAIfinalBetRangeItem: FinalBetRangeType;
  setIsModalOpen: (value: boolean) => void;
  isModalOpen: boolean;
};

export const IAAIfinalBetRangeDataItem: FC<IAAIfinalBetRangeDataItemProps> = ({
  IAAIfinalBetRangeItem,
  editing,
  setEditing,
  setIsModalOpen,
  isModalOpen,
}) => {
  return (
    <div
      className={`flex group relative items-start justify-between flex-col ${IAAIfinalBetRangeItem.id === editing?.id ? "bg-blue-300/50" : "bg-white/50"} p-2 rounded-md shadow-md`}
    >
      <div className="text-lg font-semibold">
        {IAAIfinalBetRangeItem.min} - {IAAIfinalBetRangeItem.max}
      </div>
      <div className="text-base font-normal">
        {IAAIfinalBetRangeItem.feeAmount !== null
          ? IAAIfinalBetRangeItem.feeAmount
          : `${IAAIfinalBetRangeItem.feeAmountInPercent}%`}
      </div>
      <div className="text-xs font-normal">
        Last update: {formatTimestamp(IAAIfinalBetRangeItem.updated_at)}
      </div>
      <button
        onClick={() => {
          setEditing(IAAIfinalBetRangeItem);
          setIsModalOpen(!isModalOpen);
        }}
        className="group-hover:block hidden absolute top-2 right-2 size-4 cursor-pointer shadow-2xs"
      >
        <img src={edit} alt="edit" />
      </button>
    </div>
  );
};
