import { useQuery } from "@tanstack/react-query";
import { FC, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "src/store/authStore";
import { Spinner } from "./Spinner";
import supabase from "src/supabase/client";

export const Layout: FC = () => {
  const setAuthState = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const authToken = localStorage.getItem("authToken");

  const { refetch: refetchAccount } = useQuery({
    queryKey: ["account"],
    refetchOnWindowFocus: false,
    retry: 0,
    queryFn: async () => {
      setLoading(true);
      return await supabase.auth.getUser(authToken as string);
    },
    enabled: false,
  });

  useEffect(() => {
    const verifyUser = async () => {
      if (authToken) {
        setLoading(true);
        try {
          await refetchAccount();
          setAuthState.login(authToken);
          if (location.pathname === "/") {
            navigate("/dashboard");
          }
        } catch (error) {
          localStorage.removeItem("authToken");
          navigate("/");
          throw error;
        } finally {
          setLoading(false);
        }
      } else if (location.pathname !== "/") {
        localStorage.removeItem("authToken");
        navigate("/");
      }
    };

    verifyUser();
  }, [authToken, refetchAccount]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <main className="min-h-screen bg-amber-50 overflow-hidden">
      <Outlet />
    </main>
  );
};
