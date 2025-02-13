import { FC } from "react";
import { Modal } from "../../Modal";
import { CityAndPortType } from "src/types";
import { z } from "zod";
import supabase from "src/supabase/client";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";

export type CopartCitiesAndPortsModalProps = {
  onClose: () => void;
  editCityAndPort: CityAndPortType | undefined;
  refetch: () => void;
};

const copartCitiesAndPortsSchema = z.object({
  City: z.string().nonempty(),
  SAVANNAH: z.string().nonempty(),
  TX: z.string().nonempty(),
  CA: z.string().nonempty(),
  NY: z.string().nonempty(),
});

export const CopartCitiesAndPortsEditModal: FC<
  CopartCitiesAndPortsModalProps
> = ({ editCityAndPort, onClose, refetch }) => {
  const mutation = useMutation({
    mutationFn: async ({
      City,
      SAVANNAH,
      CA,
      NY,
      TX,
    }: {
      City: string;
      SAVANNAH: string;
      CA: string;
      TX: string;
      NY: string;
    }) => {
      if (!editCityAndPort?.id) throw new Error("No city record found");

      const { error } = await supabase
        .from("copartCitiesAndPorts")
        .update({
          City,
          SAVANNAH,
          CA,
          NY,
          TX,
          updated_at: new Date().toISOString(),
        })
        .eq("id", editCityAndPort.id);

      if (error) throw error;
    },
    onSuccess: () => {
      refetch();
      onClose();
    },
  });

  const form = useForm({
    defaultValues: {
      SAVANNAH: editCityAndPort?.SAVANNAH ?? "-",
      City: editCityAndPort?.City ?? "-",
      CA: editCityAndPort?.CA ?? "-",
      TX: editCityAndPort?.TX ?? "-",
      NY: editCityAndPort?.NY ?? "-",
    },
    validators: {
      onChange: copartCitiesAndPortsSchema,
    },
    onSubmit: ({ value }) =>
      mutation.mutate({
        CA: value.CA,
        NY: value.NY,
        TX: value.TX,
        City: value.City,
        SAVANNAH: value.SAVANNAH,
      }),
  });

  return (
    <Modal
      modalSize="w-[90%] lg:w-1/3"
      onClose={() => onClose()}
      needScroll={false}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div>
          <label
            htmlFor="City"
            className="block uppercase font-semibold text-lg mb-1"
          >
            City
          </label>
          <form.Field name="City">
            {(field) => (
              <>
                <input
                  type="text"
                  id="City"
                  disabled={mutation.isPending}
                  className="p-2 border rounded-2xl w-full outline-none focus:outline-none focus:ring-2 focus:ring-blue-200 border-blue-100 bg-blue-200/30"
                  value={field.state.value}
                  onChange={(e) => form.setFieldValue("City", e.target.value)}
                />
                {field.state.meta.errors?.[0] && (
                  <div className="text-red-600 text-sm mt-1">
                    {field.state.meta.errors[0]}
                  </div>
                )}
              </>
            )}
          </form.Field>
        </div>
        <div className="grid mb-4 grid-cols-2 grid-rows-2 gap-4">
          <div>
            <label
              htmlFor="SAVANNAH"
              className="block uppercase font-semibold text-lg mb-1"
            >
              SAVANNAH
            </label>
            <form.Field name="SAVANNAH">
              {(field) => (
                <>
                  <input
                    type="text"
                    id="SAVANNAH"
                    disabled={mutation.isPending}
                    className="p-2 border rounded-2xl w-full outline-none focus:outline-none focus:ring-2 focus:ring-blue-200 border-blue-100 bg-blue-200/30"
                    value={field.state.value}
                    onChange={(e) =>
                      form.setFieldValue("SAVANNAH", e.target.value)
                    }
                  />
                  {field.state.meta.errors?.[0] && (
                    <div className="text-red-600 text-sm mt-1">
                      {field.state.meta.errors[0]}
                    </div>
                  )}
                </>
              )}
            </form.Field>
          </div>
          <div>
            <label
              htmlFor="CA"
              className="block uppercase font-semibold text-lg mb-1"
            >
              CA
            </label>
            <form.Field name="CA">
              {(field) => (
                <>
                  <input
                    type="text"
                    id="CA"
                    disabled={mutation.isPending}
                    className="p-2 border rounded-2xl w-full outline-none focus:outline-none focus:ring-2 focus:ring-blue-200 border-blue-100 bg-blue-200/30"
                    value={field.state.value}
                    onChange={(e) => form.setFieldValue("CA", e.target.value)}
                  />
                  {field.state.meta.errors?.[0] && (
                    <div className="text-red-600 text-sm mt-1">
                      {field.state.meta.errors[0]}
                    </div>
                  )}
                </>
              )}
            </form.Field>
          </div>
          <div>
            <label
              htmlFor="NY"
              className="block uppercase font-semibold text-lg mb-1"
            >
              NY
            </label>
            <form.Field name="NY">
              {(field) => (
                <>
                  <input
                    type="text"
                    id="NY"
                    disabled={mutation.isPending}
                    className="p-2 border rounded-2xl w-full outline-none focus:outline-none focus:ring-2 focus:ring-blue-200 border-blue-100 bg-blue-200/30"
                    value={field.state.value}
                    onChange={(e) => form.setFieldValue("NY", e.target.value)}
                  />
                  {field.state.meta.errors?.[0] && (
                    <div className="text-red-600 text-sm mt-1">
                      {field.state.meta.errors[0]}
                    </div>
                  )}
                </>
              )}
            </form.Field>
          </div>
          <div>
            <label
              htmlFor="TX"
              className="block uppercase font-semibold text-lg mb-1"
            >
              TX
            </label>
            <form.Field name="TX">
              {(field) => (
                <>
                  <input
                    type="text"
                    id="TX"
                    disabled={mutation.isPending}
                    className="p-2 border rounded-2xl w-full outline-none focus:outline-none focus:ring-2 focus:ring-blue-200 border-blue-100 bg-blue-200/30"
                    value={field.state.value}
                    onChange={(e) => form.setFieldValue("TX", e.target.value)}
                  />
                  {field.state.meta.errors?.[0] && (
                    <div className="text-red-600 text-sm mt-1">
                      {field.state.meta.errors[0]}
                    </div>
                  )}
                </>
              )}
            </form.Field>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="bg-white cursor-pointer flex items-center justify-center border border-blue-500 text-blue-500 px-6 py-1.5 rounded font-semibold text-xl hover:bg-blue-200/20"
            disabled={form.state.isSubmitting}
            onClick={() => onClose()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 cursor-pointer flex items-center justify-center text-white px-6 py-1.5 rounded font-semibold text-xl hover:bg-blue-600"
            disabled={form.state.isSubmitting}
          >
            {mutation.isPending ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </Modal>
  );
};
