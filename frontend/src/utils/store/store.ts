import create from "zustand";

type Store = {
  isLoggedIn: boolean;
  userId: number | null;
  logInUser: (userId: number) => void;
  logOutUser: () => void;
};

const useStore = create<Store>((set, get) => ({
  isLoggedIn: false,
  userId: null,
  logInUser: (userId) => set(() => ({ isLoggedIn: true, userId: userId })),
  logOutUser: () => set(() => ({ isLoggedIn: false, userId: null }))
}));

export default useStore;
