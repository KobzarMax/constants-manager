import { FC } from "react";
import { Modal } from "../../Modal";
import { CityForDelivery } from "src/types";
import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import supabase from "src/supabase/client";

export type CityForDeliveryModalProps = {
  onClose: () => void;
  editCity: CityForDelivery | undefined;
  refetch: () => void;
};

const cityForDeliverySchema = z.object({
  city: z.string().min(3, { message: "City is required" }),
  cost: z.number().min(1, { message: "Cost is required" }),
});

export const CityDeliveryModal: FC<CityForDeliveryModalProps> = ({
  editCity,
  onClose,
  refetch,
}) => {
  const mutation = useMutation({
    mutationFn: async ({ city, cost }: { city: string; cost: number }) => {
      if (!editCity?.id) throw new Error("No city record found");

      const { error } = await supabase
        .from("citiesForDelivery")
        .update({
          city,
          cost,
          updated_at: new Date().toISOString(),
        })
        .eq("id", editCity.id);

      if (error) throw error;
    },
    onSuccess: () => {
      refetch();
      onClose();
    },
  });

  const form = useForm({
    defaultValues: { city: editCity?.city ?? "", cost: editCity?.cost ?? 0 },
    validators: {
      onChange: cityForDeliverySchema,
    },
    onSubmit: ({ value }) =>
      mutation.mutate({ city: value.city, cost: value.cost }),
  });

  return (
    <Modal modalSize="w-1/4" onClose={() => onClose()} needScroll={false}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div className="mb-4 w-full">
          <label htmlFor="city" className="block font-semibold text-lg mb-1">
            City
          </label>
          <form.Field name="city">
            {(field) => (
              <>
                <input
                  type="text"
                  id="city"
                  disabled={mutation.isPending}
                  className="p-2 border rounded-2xl outline-none focus:outline-none focus:ring-2 focus:ring-blue-200 border-blue-100 bg-blue-200/30"
                  value={field.state.value}
                  onChange={(e) => form.setFieldValue("city", e.target.value)}
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
        <div className="mb-4">
          <label htmlFor="cost" className="block font-semibold text-lg mb-1">
            Cost
          </label>
          <form.Field name="cost">
            {(field) => (
              <>
                <input
                  type="number"
                  id="cost"
                  disabled={mutation.isPending}
                  className="p-2 border rounded-2xl outline-none focus:outline-none focus:ring-2 focus:ring-blue-200 border-blue-100 bg-blue-200/30"
                  value={field.state.value}
                  onChange={(e) =>
                    form.setFieldValue("cost", Number(e.target.value))
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
