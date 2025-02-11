import { useQuery } from "@tanstack/react-query";
import { FC, Fragment, useState, useMemo } from "react";
import supabase from "src/supabase/client";
import { Spinner } from "../../Spinner";
import { CityAndPortType } from "src/types";
import { CopartCitiesAndPortsEditModal } from "./CopartCitiesAndPortsEditModal";
import { CopartCitiesAndPortsDataItem } from "./CopartCitiesAndPortsDataItem";

export const CopartCitiesAndPortsData: FC = () => {
  const [editing, setEditing] = useState<CityAndPortType | undefined>(
    undefined,
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleCloseModal = (): void => {
    setIsModalOpen(!isModalOpen);
    setEditing(undefined);
  };
  const {
    data: copartCitiesAndPorts,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["copartCitiesAndPorts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("copartCitiesAndPorts")
        .select("*");
      if (error) throw error;
      return data as CityAndPortType[];
    },
    refetchOnWindowFocus: false,
  });

  const copartCitiesAndPortsData = useMemo(
    () =>
      (copartCitiesAndPorts ?? []).sort((a, b) => {
        if (a.City < b.City) return -1;
        if (a.City > b.City) return 1;
        return 0;
      }),
    [copartCitiesAndPorts],
  );

  if (isLoading) return <Spinner />;

  return (
    <Fragment>
      <h1 className="uppercase text-2xl mb-6 font-semibold">
        Copart cities and ports
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 flex-wrap">
        {copartCitiesAndPortsData.map((copartCitiesAndPortsItem) => (
          <CopartCitiesAndPortsDataItem
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            editing={editing}
            setEditing={setEditing}
            copartCitiesAndPortsItem={copartCitiesAndPortsItem}
            key={copartCitiesAndPortsItem.id}
          />
        ))}
      </div>
      {isModalOpen && (
        <CopartCitiesAndPortsEditModal
          refetch={refetch}
          onClose={handleCloseModal}
          editCityAndPort={editing}
        />
      )}
    </Fragment>
  );
};
