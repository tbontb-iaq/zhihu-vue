import { defineStore } from "pinia";

export const useLocalStorage = defineStore("local-storage", {
  actions: {
    // number string boolean object
    async get<T>(
      key: string,
      make: () => Promise<T> | T,
      { retry = false } = {}
    ): Promise<T> {
      if (!retry) {
        const str = localStorage.getItem(key);
        if (str) return JSON.parse(str);
      }

      const value = await make();
      localStorage.setItem(key, JSON.stringify(value));
      return value;
    },
  },
});
