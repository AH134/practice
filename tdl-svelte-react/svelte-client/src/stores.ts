import { writable } from "svelte/store";
import type { User } from "./types";

function createUser() {
  const defaultUser: User = {
    name: "demo",
    password: "demo123",
    loggedIn: false,
  };
  const { subscribe, set, update } = writable(defaultUser);

  return {
    subscribe,
    setLoggedOut: () =>
      update((user) => {
        return { ...user, loggedIn: false };
      }),
    setLoggedIn: () =>
      update((user) => {
        return { ...user, loggedIn: true };
      }),
    reset: () => set(defaultUser),
  };
}

export const user = createUser();
