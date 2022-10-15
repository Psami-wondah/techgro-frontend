import { AtomEffect, DefaultValue } from "recoil";

export const Auth = {
  getToken: () => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("recoil-persist") || "");
      const token = user["user-login"].access_token;
      return token as string;
    } else {
      return null;
    }
  },
};

export const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    if (typeof window !== "undefined") {
      const savedValue = localStorage.getItem(key);
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }

      onSet((newValue) => {
        if (newValue instanceof DefaultValue) {
          localStorage.removeItem(key);
        } else {
          localStorage.setItem(key, JSON.stringify(newValue));
        }
      });
    }
  };
