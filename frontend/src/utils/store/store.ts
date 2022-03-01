import create from "zustand";

type Store = {
  isLoggedIn: boolean;
  userId: number | null;
  username: string | null;
  logInUser: (userId: number, username: string) => void;
  logOutUser: () => void;
};

const useStore = create<Store>((set, get) => ({
  isLoggedIn: false,
  userId: null,
  username: null,
  logInUser: (userId, username) =>
    set(() => ({ isLoggedIn: true, userId: userId, username: username })),
  logOutUser: () =>
    set(() => ({ isLoggedIn: false, userId: null, username: null }))
}));

export default useStore;
