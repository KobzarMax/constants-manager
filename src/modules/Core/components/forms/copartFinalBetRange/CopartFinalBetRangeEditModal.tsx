import { FC } from "react";
import { Modal } from "../../Modal";
import { FinalBetRangeType } from "src/types";
import { z } from "zod";
import supabase from "src/supabase/client";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";

export type CopartFinalBetRangeModalProps = {
  onClose: () => void;
  editRange: FinalBetRangeType | undefined;
  refetch: () => void;
};

const copartFinalBetRangeSchema = z.object({
  min: z.number().min(0.01, { message: "Min is required" }),
  max: z.number().min(0.01, { message: "Max is required" }),
  feeAmount: z.number().optional(),
  feeAmountInPercent: z.number().optional(),
});

export const CopartFinalBetRangeEditModal: FC<
  CopartFinalBetRangeModalProps
> = ({ editRange, onClose, refetch }) => {
  const mutation = useMutation({
    mutationFn: async ({
      max,
      min,
      feeAmount,
      feeAmountInPercent,
    }: {
      max: number;
      min: number;
      feeAmount?: number;
      feeAmountInPercent?: number;
    }) => {
      if (!editRange?.id) throw new Error("No city record found");

      const { error } = await supabase
        .from("copartFinalBetRange")
        .update({
          min,
          max,
          feeAmount: feeAmount === 0 ? null : feeAmount,
          feeAmountInPercent:
            feeAmountInPercent === 0 ? null : feeAmountInPercent,
          updated_at: new Date().toISOString(),
        })
        .eq("id", editRange.id);

      if (error) throw error;
    },
    onSuccess: () => {
      refetch();
      onClose();
    },
  });

  const form = useForm({
    defaultValues: {
      min: editRange?.min ?? 0,
      max: editRange?.max ?? 0,
      feeAmount: editRange?.feeAmount ?? 0,
      feeAmountInPercent: editRange?.feeAmountInPercent ?? 0,
    },
    validators: {
      onChange: copartFinalBetRangeSchema,
    },
    onSubmit: ({ value }) =>
      mutation.mutate({
        min: value.min,
        max: value.max,
        feeAmount: value.feeAmount,
        feeAmountInPercent: value.feeAmountInPercent,
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
        {editRange?.feeAmountInPercent === null ? (
          <div className="mb-4">
            <label
              htmlFor="min"
              className="block uppercase font-semibold text-lg mb-1"
            >
              Fee amount
            </label>
            <form.Field name="feeAmount">
              {(field) => (
                <>
                  <input
                    type="number"
                    id="feeAmount"
                    step={0.01}
                    disabled={mutation.isPending}
                    className="p-2 border rounded-2xl w-full outline-none focus:outline-none focus:ring-2 focus:ring-blue-200 border-blue-100 bg-blue-200/30"
                    value={field.state.value}
                    onChange={(e) =>
                      form.setFieldValue("feeAmount", Number(e.target.value))
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
        ) : (
          <div className="mb-4">
            <label
              htmlFor="min"
              className="block uppercase font-semibold text-lg mb-1"
            >
              Fee amount in percent
            </label>
            <form.Field name="feeAmountInPercent">
              {(field) => (
                <>
                  <input
                    type="number"
                    id="feeAmountInPercent"
                    step={0.01}
                    disabled={mutation.isPending}
                    className="p-2 border rounded-2xl w-full outline-none focus:outline-none focus:ring-2 focus:ring-blue-200 border-blue-100 bg-blue-200/30"
                    value={field.state.value}
                    onChange={(e) =>
                      form.setFieldValue(
                        "feeAmountInPercent",
                        Number(e.target.value),
                      )
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
        )}

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
