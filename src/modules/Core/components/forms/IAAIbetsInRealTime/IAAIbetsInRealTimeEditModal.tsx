import { FC } from "react";
import { Modal } from "../../Modal";
import { BetInRealTimeType } from "src/types";
import { z } from "zod";
import supabase from "src/supabase/client";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";

export type IAAIbetsInRealTimeModalProps = {
  onClose: () => void;
  editBet: BetInRealTimeType | undefined;
  refetch: () => void;
};

const IAAIbetsInRealTimeSchema = z.object({
  min: z.number().min(0, { message: "Min is required" }),
  max: z.number().min(0.01, { message: "Max is required" }),
  bet: z.number().min(0.01, { message: "Bet is required" }),
});

export const IAAIbetsInRealTimeEditModal: FC<IAAIbetsInRealTimeModalProps> = ({
  editBet,
  onClose,
  refetch,
}) => {
  const mutation = useMutation({
    mutationFn: async ({
      max,
      min,
      bet,
    }: {
      max: number;
      min: number;
      bet: number;
    }) => {
      if (!editBet?.id) throw new Error("No city record found");

      const { error } = await supabase
        .from("IAAIbetsInRealTime")
        .update({
          min,
          max,
          bet,
          updated_at: new Date().toISOString(),
        })
        .eq("id", editBet.id);

      if (error) throw error;
    },
    onSuccess: () => {
      refetch();
      onClose();
    },
  });

  const form = useForm({
    defaultValues: {
      min: editBet?.min ?? 0,
      max: editBet?.max ?? 0,
      bet: editBet?.bet ?? 0,
    },
    validators: {
      onChange: IAAIbetsInRealTimeSchema,
    },
    onSubmit: ({ value }) =>
      mutation.mutate({
        min: value.min,
        max: value.max,
        bet: value.bet,
      }),
  });

  return (
    <Modal modalSize="w-1/3" onClose={() => onClose()} needScroll={false}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div className="grid mb-4 grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="min"
              className="block uppercase font-semibold text-lg mb-1"
            >
              Min
            </label>
            <form.Field name="min">
              {(field) => (
                <>
                  <input
                    type="number"
                    id="min"
                    step={0.01}
                    disabled={mutation.isPending}
                    className="p-2 border rounded-2xl w-full outline-none focus:outline-none focus:ring-2 focus:ring-blue-200 border-blue-100 bg-blue-200/30"
                    value={field.state.value}
                    onChange={(e) =>
                      form.setFieldValue("min", Number(e.target.value))
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
              htmlFor="max"
              className="block uppercase font-semibold text-lg mb-1"
            >
              MAX
            </label>
            <form.Field name="max">
              {(field) => (
                <>
                  <input
                    type="number"
                    id="max"
                    step={0.01}
                    disabled={mutation.isPending}
                    className="p-2 border rounded-2xl w-full outline-none focus:outline-none focus:ring-2 focus:ring-blue-200 border-blue-100 bg-blue-200/30"
                    value={field.state.value}
                    onChange={(e) =>
                      form.setFieldValue("max", Number(e.target.value))
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
        </div>
        <div className="mb-4">
          <label
            htmlFor="min"
            className="block uppercase font-semibold text-lg mb-1"
          >
            Bet
          </label>
          <form.Field name="bet">
            {(field) => (
              <>
                <input
                  type="number"
                  id="bet"
                  step={0.01}
                  disabled={mutation.isPending}
                  className="p-2 border rounded-2xl w-full outline-none focus:outline-none focus:ring-2 focus:ring-blue-200 border-blue-100 bg-blue-200/30"
                  value={field.state.value}
                  onChange={(e) =>
                    form.setFieldValue("bet", Number(e.target.value))
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
