import { FC } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import supabase from "src/supabase/client";
import useAuthStore from "src/store/authStore";
import { NavigateFunction, useNavigate } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().min(3, { message: "Email is required" }),
  password: z.string().min(8, { message: "Password is required" }),
});

const LoginPage: FC = () => {
  const { login } = useAuthStore();
  const navigate: NavigateFunction = useNavigate();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onChange: loginSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const { data } = await supabase.auth.signInWithPassword({
          email: value.email,
          password: value.password,
        });
        if (data && data.session) {
          const token = data.session?.access_token;
          localStorage.setItem("authToken", token);
          login(token);
          navigate("/dashboard");
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });

  return (
    <div className="min-h-dvh p-5 flex items-center justify-center">
      <div className="mx-auto w-full max-w-lg shadow-2xl rounded-2xl p-4 bg-blue-50">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <div className="mb-4">
            <label htmlFor="email" className="block font-semibold text-sm mb-1">
              E-mail
            </label>
            <form.Field name="email">
              {(field) => (
                <>
                  <input
                    type="text"
                    id="email"
                    className="w-full p-2 border rounded-2xl outline-none focus:outline-none focus:ring-2 focus:ring-blue-200 border-blue-100 bg-blue-200/30"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
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
            <label
              htmlFor="password"
              className="block font-semibold text-sm mb-1"
            >
              Password
            </label>
            <form.Field name="password">
              {(field) => (
                <>
                  <input
                    type="password"
                    id="password"
                    className="w-full p-2 border rounded-2xl outline-none focus:outline-none focus:ring-2 focus:ring-blue-200 border-blue-100 bg-blue-200/30"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
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
            className="bg-blue-500 cursor-pointer mr-0 ml-auto flex items-center justify-center text-white px-6 py-1.5 rounded font-semibold text-xl hover:bg-blue-600"
            disabled={form.state.isSubmitting}
          >
            {form.state.isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
