import { FC } from "react";
import { Sidebar } from "../Core/components/Sidebar";
import { FormRender } from "@/Core/components/FormRender";

const DashboardPage: FC = () => {
  return (
    <div className="min-h-dvh grid grid-cols-[320px_1fr]">
      <Sidebar />
      <FormRender />
    </div>
  );
};

export default DashboardPage;
