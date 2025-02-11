import { FC } from "react";
import { edit } from "src/static/icons";
import { CityAndPortType } from "src/types";
import { formatTimestamp } from "src/utils";

export type IAAIcitiesAndPortsDataItemProps = {
  editing: CityAndPortType | undefined;
  setEditing: (item: CityAndPortType) => void;
  IAAIcitiesAndPortsItem: CityAndPortType;
  setIsModalOpen: (value: boolean) => void;
  isModalOpen: boolean;
};

export const IAAIcitiesAndPortsDataItem: FC<
  IAAIcitiesAndPortsDataItemProps
> = ({
  IAAIcitiesAndPortsItem,
  editing,
  setEditing,
  setIsModalOpen,
  isModalOpen,
}) => {
  return (
    <div
      className={`flex group relative items-start justify-between flex-col ${IAAIcitiesAndPortsItem.id === editing?.id ? "bg-blue-300/50" : "bg-white/50"} p-2 rounded-md shadow-md`}
    >
      <div className="text-lg font-semibold">{IAAIcitiesAndPortsItem.City}</div>
      <div className="text-base font-normal">
        SAVANNAH: {IAAIcitiesAndPortsItem.SAVANNAH}
      </div>
      <div className="text-base font-normal">
        CA: {IAAIcitiesAndPortsItem.CA}
      </div>
      <div className="text-base font-normal">
        NY: {IAAIcitiesAndPortsItem.NY}
      </div>
      <div className="text-base font-normal">
        TX: {IAAIcitiesAndPortsItem.TX}
      </div>
      <div className="text-xs font-normal">
        Last update: {formatTimestamp(IAAIcitiesAndPortsItem.updated_at)}
      </div>
      <button
        onClick={() => {
          setEditing(IAAIcitiesAndPortsItem);
          setIsModalOpen(!isModalOpen);
        }}
        className="group-hover:block hidden absolute top-2 right-2 size-4 cursor-pointer shadow-2xs"
      >
        <img src={edit} alt="edit" />
      </button>
    </div>
  );
};
