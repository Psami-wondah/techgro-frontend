export const Auth = {
  getToken: () => {
    if (typeof window !== "undefined") {
      const recoil = JSON.parse(localStorage.getItem("recoil-persist") || "");
      const token = recoil["user-login"].access_token;
      return token as string;
    } else {
      return null;
    }
  },
};
