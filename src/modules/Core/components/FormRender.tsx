import { FC } from "react";
import useFormStore from "src/store/formStore";
import { SuvConstForm } from "./forms/suv/SuvConstForm";
import { CONSTANTS } from "src/types/constants";
import { CitiesForDelivery } from "./forms/citiesForDelivery/CitiesForDelivery";
import { PortOdessaForm } from "./forms/portOdessa/PortOdessaForm";
import { CopartConstantForm } from "./forms/copartConstant/CopartConstantForm";
import { IAAIConstantForm } from "./forms/IAAIConstant/IAAIConstantForm";
import { HAZMATConstForm } from "./forms/HAZMATConst/HAZMATConstForm";
import { CopartFinalBetRangeData } from "./forms/copartFinalBetRange/CopartFinalBetRangeData";
import { IAAIfinalBetRangeData } from "./forms/IAAIfinalBetRange/IAAIfinalBetRangeData";
import { CopardBetsInRealTimeData } from "./forms/CopardBetsInRealTime/CopardBetsInRealTimeData";
import { IAAIbetsInRealTimeData } from "./forms/IAAIbetsInRealTime/IAAIbetsInRealTimeData";
import { IAAIcitiesAndPortsData } from "./forms/IAAIcitiesAndPorts/IAAIcitiesAndPortsData";
import { CopartCitiesAndPortsData } from "./forms/CopartCitiesAndPorts/CopartCitiesAndPortsData";
import { InsuranceConstForm } from "./forms/insuranceConst/insuranceConstForm";

export const FormRender: FC = () => {
  const form = useFormStore((state) => state.activeForm);

  const handleActiveForm = () => {
    switch (form) {
      case CONSTANTS.SUV:
        return <SuvConstForm />;
      case CONSTANTS.CITIES_FOR_DELIVERY:
        return <CitiesForDelivery />;
      case CONSTANTS.PORT_ODESSA:
        return <PortOdessaForm />;
      case CONSTANTS.COPART_CONSTANTS:
        return <CopartConstantForm />;
      case CONSTANTS.IAAI_CONSTANT:
        return <IAAIConstantForm />;
      case CONSTANTS.HAZMAT_CONST:
        return <HAZMATConstForm />;
      case CONSTANTS.COPART_FINAL_BET_RANGE:
        return <CopartFinalBetRangeData />;
      case CONSTANTS.IAAI_FINAL_BET_RANGE:
        return <IAAIfinalBetRangeData />;
      case CONSTANTS.COPART_BETS_IN_REAL_TIME:
        return <CopardBetsInRealTimeData />;
      case CONSTANTS.IAAI_BETS_IN_REAL_TIME:
        return <IAAIbetsInRealTimeData />;
      case CONSTANTS.IAAI_CITIES_AND_PORTS:
        return <IAAIcitiesAndPortsData />;
      case CONSTANTS.COPART_CITIES_AND_PORTS:
        return <CopartCitiesAndPortsData />;
      case CONSTANTS.INSURANCE_CONST:
        return <InsuranceConstForm />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full p-5 max-h-dvh overflow-y-auto">
      {handleActiveForm()}
    </div>
  );
};
