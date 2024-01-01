import { writable } from "svelte/store";

function createLoggedIn() {
  const { subscribe, set, update } = writable(false);

  return {
    subscribe,
    setFalse: () => update((n) => (n = false)),
    setTrue: () => update((n) => (n = true)),
    reset: () => set(false),
  };
}

export const loggedIn = createLoggedIn();
