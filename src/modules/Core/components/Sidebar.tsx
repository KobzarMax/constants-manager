import { FC } from "react";
import { useNavigate } from "react-router-dom";
import useFormStore from "src/store/formStore";
import supabase from "src/supabase/client";

export const Sidebar: FC = () => {
  const navigate = useNavigate();
  const { activeForm, setActiveForm, forms } = useFormStore();

  const logout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div className="max-w-xs w-full flex flex-col items-start justify-between h-dvh bg-blue-300 p-4 border-r border-blue-400 shadow-lg">
      <ul className="space-y-2.5 w-full">
        {forms.map((item) => (
          <li
            onClick={() => setActiveForm(item)}
            className={`p-2 w-full text-sm font-semibold cursor-pointer border-b border-transparent hover:bg-white/75 ${activeForm === item ? "bg-white/50" : "border-white/50"}`}
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
      <button
        className="px-2 py-4 rounded-md bg-white/50 w-full text-lg font-semibold cursor-pointer hover:shadow-2xl"
        onClick={() => logout()}
      >
        Logout
      </button>
    </div>
  );
};
