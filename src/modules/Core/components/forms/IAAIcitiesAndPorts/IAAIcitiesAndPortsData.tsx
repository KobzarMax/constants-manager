import { useQuery } from "@tanstack/react-query";
import { FC, Fragment, useState, useMemo } from "react";
import supabase from "src/supabase/client";
import { Spinner } from "../../Spinner";
import { IAAIcitiesAndPortsDataItem } from "./IAAIcitiesAndPortsDataItem";
import { CityAndPortType } from "src/types";
import { IAAIcitiesAndPortsEditModal } from "./IAAIcitiesAndPortsEditModal";

export const IAAIcitiesAndPortsData: FC = () => {
  const [editing, setEditing] = useState<CityAndPortType | undefined>(
    undefined,
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleCloseModal = (): void => {
    setIsModalOpen(!isModalOpen);
    setEditing(undefined);
  };
  const {
    data: IAAIcitiesAndPorts,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["IAAIcitiesAndPorts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("IAAIcitiesAndPorts")
        .select("*");
      if (error) throw error;
      return data as CityAndPortType[];
    },
    refetchOnWindowFocus: false,
  });

  const IAAIcitiesAndPortsData = useMemo(
    () =>
      (IAAIcitiesAndPorts ?? []).sort((a, b) => {
        if (a.City < b.City) return -1;
        if (a.City > b.City) return 1;
        return 0;
      }),
    [IAAIcitiesAndPorts],
  );

  if (isLoading) return <Spinner />;

  return (
    <Fragment>
      <h1 className="uppercase text-2xl mb-6 font-semibold">
        IAAI cities and ports
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 flex-wrap">
        {IAAIcitiesAndPortsData.map((IAAIcitiesAndPortsItem) => (
          <IAAIcitiesAndPortsDataItem
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            editing={editing}
            setEditing={setEditing}
            IAAIcitiesAndPortsItem={IAAIcitiesAndPortsItem}
            key={IAAIcitiesAndPortsItem.id}
          />
        ))}
      </div>
      {isModalOpen && (
        <IAAIcitiesAndPortsEditModal
          refetch={refetch}
          onClose={handleCloseModal}
          editCityAndPort={editing}
        />
      )}
    </Fragment>
  );
};
