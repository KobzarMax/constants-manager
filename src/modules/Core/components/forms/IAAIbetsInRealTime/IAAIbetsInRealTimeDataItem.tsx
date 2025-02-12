import { FC } from "react";
import { edit } from "src/static/icons";
import { BetInRealTimeType } from "src/types";
import { formatTimestamp } from "src/utils";

export type IAAIbetsInRealTimeDataItemProps = {
  editing: BetInRealTimeType | undefined;
  setEditing: (item: BetInRealTimeType) => void;
  IAAIbetsInRealTimeItem: BetInRealTimeType;
  setIsModalOpen: (value: boolean) => void;
  isModalOpen: boolean;
};

export const IAAIbetsInRealTimeDataItem: FC<
  IAAIbetsInRealTimeDataItemProps
> = ({
  IAAIbetsInRealTimeItem,
  editing,
  setEditing,
  setIsModalOpen,
  isModalOpen,
}) => {
  return (
    <div
      className={`flex items-start justify-between flex-col ${IAAIbetsInRealTimeItem.id === editing?.id ? "bg-blue-300/50" : "bg-white/50"} p-2 rounded-md shadow-md`}
    >
      <button
        onClick={() => {
          setEditing(IAAIbetsInRealTimeItem);
          setIsModalOpen(!isModalOpen);
        }}
        className="mr-0 ml-auto size-4 cursor-pointer shadow-2xs"
      >
        <img src={edit} alt="edit" />
      </button>
      <div className="text-lg font-semibold">
        {IAAIbetsInRealTimeItem.min} - {IAAIbetsInRealTimeItem.max}
      </div>
      <div className="text-base font-normal">{IAAIbetsInRealTimeItem.bet}</div>
      <div className="text-xs font-normal">
        Last update: {formatTimestamp(IAAIbetsInRealTimeItem.updated_at)}
      </div>
    </div>
  );
};
