import { CONSTANTS } from "src/types/constants";
import { create } from "zustand";

type FormState = {
  forms: CONSTANTS[];
  activeForm: CONSTANTS;
  setActiveForm: (form: CONSTANTS) => void;
};

const useFormStore = create<FormState>((set) => ({
  forms: Object.values(CONSTANTS) as CONSTANTS[],
  activeForm: Object.values(CONSTANTS)[0] as CONSTANTS,
  setActiveForm: (form) => set({ activeForm: form }),
}));

export default useFormStore;
