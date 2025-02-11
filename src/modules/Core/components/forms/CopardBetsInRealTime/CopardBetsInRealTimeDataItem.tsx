import { FC } from "react";
import { edit } from "src/static/icons";
import { BetInRealTimeType } from "src/types";
import { formatTimestamp } from "src/utils";

export type CopardBetsInRealTimeDataItemProps = {
  editing: BetInRealTimeType | undefined;
  setEditing: (item: BetInRealTimeType) => void;
  copardBetsInRealTimeItem: BetInRealTimeType;
  setIsModalOpen: (value: boolean) => void;
  isModalOpen: boolean;
};

export const CopardBetsInRealTimeDataItem: FC<
  CopardBetsInRealTimeDataItemProps
> = ({
  copardBetsInRealTimeItem,
  editing,
  setEditing,
  setIsModalOpen,
  isModalOpen,
}) => {
  return (
    <div
      className={`flex group relative items-start justify-between flex-col ${copardBetsInRealTimeItem.id === editing?.id ? "bg-blue-300/50" : "bg-white/50"} p-2 rounded-md shadow-md`}
    >
      <div className="text-lg font-semibold">
        {copardBetsInRealTimeItem.min} - {copardBetsInRealTimeItem.max}
      </div>
      <div className="text-base font-normal">
        {copardBetsInRealTimeItem.bet}
      </div>
      <div className="text-xs font-normal">
        Last update: {formatTimestamp(copardBetsInRealTimeItem.updated_at)}
      </div>
      <button
        onClick={() => {
          setEditing(copardBetsInRealTimeItem);
          setIsModalOpen(!isModalOpen);
        }}
        className="group-hover:block hidden absolute top-2 right-2 size-4 cursor-pointer shadow-2xs"
      >
        <img src={edit} alt="edit" />
      </button>
    </div>
  );
};
