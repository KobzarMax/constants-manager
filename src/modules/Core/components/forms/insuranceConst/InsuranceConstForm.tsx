import { FC } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import supabase from "src/supabase/client";
import { Spinner } from "../../Spinner";
import { formatTimestamp } from "src/utils";
import { z } from "zod";

const insuranceSchema = z.object({
  value: z
    .number()
    .min(0.01, "Value must be greater than 0")
    .max(1000000, "Value is too high"),
});

export const InsuranceConstForm: FC = () => {
  const {
    data: insuranceConstData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["insuranceConst"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("insuranceConst")
        .select("*")
        .single();
      if (error) throw error;
      return data;
    },
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation({
    mutationFn: async (newValue: number) => {
      if (!insuranceConstData?.id)
        throw new Error("No portOdessaData record found");
      const { error } = await supabase
        .from("insuranceConst")
        .update({ value: newValue, updated_at: new Date().toISOString() })
        .eq("id", insuranceConstData.id);
      if (error) throw error;
      return newValue;
    },
    onSuccess: () => {
      refetch();
    },
  });

  const form = useForm({
    defaultValues: { value: insuranceConstData?.value ?? 0 },
    onSubmit: ({ value }) => mutation.mutate(value.value),
    validators: {
      onChange: insuranceSchema,
    },
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="h-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div className="mb-4">
          <label htmlFor="value" className="block font-semibold text-lg mb-1">
            Insurance Constant |{" "}
            <span className="text-xs font-normal">
              Last update: {formatTimestamp(insuranceConstData?.updated_at)}
            </span>
          </label>
          <form.Field name="value">
            {(field) => (
              <>
                <input
                  type="number"
                  id="number"
                  step={0.01}
                  disabled={mutation.isPending}
                  className="p-2 border rounded-2xl outline-none focus:outline-none focus:ring-2 focus:ring-blue-200 border-blue-100 bg-blue-200/30"
                  value={field.state.value}
                  onChange={(e) =>
                    form.setFieldValue("value", Number(e.target.value))
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
        <button
          type="submit"
          className="bg-blue-500 cursor-pointer flex items-center justify-center text-white px-6 py-1.5 rounded font-semibold text-xl hover:bg-blue-600"
          disabled={form.state.isSubmitting}
        >
          {mutation.isPending ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};
