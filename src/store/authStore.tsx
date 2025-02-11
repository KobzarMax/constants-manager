import { create } from "zustand";

type AuthState = {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
}));

export default useAuthStore;
