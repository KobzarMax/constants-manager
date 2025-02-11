import { FC } from "react";
import { edit } from "src/static/icons";
import { CityAndPortType } from "src/types";
import { formatTimestamp } from "src/utils";

export type CopartCitiesAndPortsDataItemProps = {
  editing: CityAndPortType | undefined;
  setEditing: (item: CityAndPortType) => void;
  copartCitiesAndPortsItem: CityAndPortType;
  setIsModalOpen: (value: boolean) => void;
  isModalOpen: boolean;
};

export const CopartCitiesAndPortsDataItem: FC<
  CopartCitiesAndPortsDataItemProps
> = ({
  copartCitiesAndPortsItem,
  editing,
  setEditing,
  setIsModalOpen,
  isModalOpen,
}) => {
  return (
    <div
      className={`flex group relative items-start justify-between flex-col ${copartCitiesAndPortsItem.id === editing?.id ? "bg-blue-300/50" : "bg-white/50"} p-2 rounded-md shadow-md`}
    >
      <div className="text-lg font-semibold">
        {copartCitiesAndPortsItem.City}
      </div>
      <div className="text-base font-normal">
        SAVANNAH: {copartCitiesAndPortsItem.SAVANNAH}
      </div>
      <div className="text-base font-normal">
        CA: {copartCitiesAndPortsItem.CA}
      </div>
      <div className="text-base font-normal">
        NY: {copartCitiesAndPortsItem.NY}
      </div>
      <div className="text-base font-normal">
        TX: {copartCitiesAndPortsItem.TX}
      </div>
      <div className="text-xs font-normal">
        Last update: {formatTimestamp(copartCitiesAndPortsItem.updated_at)}
      </div>
      <button
        onClick={() => {
          setEditing(copartCitiesAndPortsItem);
          setIsModalOpen(!isModalOpen);
        }}
        className="group-hover:block hidden absolute top-2 right-2 size-4 cursor-pointer shadow-2xs"
      >
        <img src={edit} alt="edit" />
      </button>
    </div>
  );
};
