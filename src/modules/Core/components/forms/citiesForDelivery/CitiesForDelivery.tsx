import { FC, Fragment, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import supabase from "src/supabase/client";
import { Spinner } from "../../Spinner";
import { formatTimestamp } from "src/utils";
import { CityForDelivery } from "src/types";
import { edit } from "src/static/icons";
import { CityDeliveryModal } from "./CityDeliveryModal";

export const CitiesForDelivery: FC = () => {
  const [editableCity, setEditableCity] = useState<CityForDelivery | undefined>(
    undefined,
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleCloseModal = (): void => {
    setIsModalOpen(!isModalOpen);
  };

  const {
    data: citiesData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["citiesForDelivery"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("citiesForDelivery")
        .select("*");
      if (error) throw error;
      return data as CityForDelivery[];
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Spinner />;

  const data = citiesData ?? [];

  return (
    <Fragment>
      <div className="flex items-center justify-between gap-5 flex-wrap">
        {data.map((city: CityForDelivery) => (
          <div
            key={city.id}
            className="flex group items-start justify-between flex-col bg-white/50 p-2 rounded-md shadow-md"
          >
            <button
              onClick={() => {
                setEditableCity(city);
                setIsModalOpen(!isModalOpen);
              }}
              className="mr-0 ml-auto size-4 cursor-pointer shadow-2xs"
            >
              <img src={edit} alt="edit" />
            </button>
            <div className="text-lg font-semibold">
              {city.city} - {city.cost}
            </div>
            <div className="text-xs font-normal">
              Last update: {formatTimestamp(city.updated_at)}
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <CityDeliveryModal
          refetch={refetch}
          onClose={handleCloseModal}
          editCity={editableCity}
        />
      )}
    </Fragment>
  );
};
