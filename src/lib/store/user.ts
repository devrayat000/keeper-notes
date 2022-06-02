import { User as IUser } from "$lib/graphql/generated";
import create from "zustand";
import { devtools } from "zustand/middleware";

type User = Omit<IUser, "__typename" | "token" | "createdAt">;

export interface UserStore {
  user: User | null;
  setUser(user: User | null): void;
}

export const useUserStore = create<UserStore>()(
  devtools(
    // @ts-ignore
    (set) => ({
      user: null,
      setUser(user) {
        set({ user });
      },
    }),
    {
      name: "keeper-store",
      enabled: true,
      anonymousActionType: "keeper-action",
    }
  )
);
