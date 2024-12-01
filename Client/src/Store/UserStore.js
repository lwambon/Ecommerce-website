import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

function userState(set) {
  return {
    user: null,
    token: null,

    setUser: function (userInformationObj, authToken) {
      console.log("User being set:", userInformationObj);
      console.log("Token being set:", authToken);

      set(() => ({
        user: userInformationObj,
        token: authToken,
      }));
    },

    logoutUser: function () {
      set(() => {
        return { user: null, token: null };
      });
    },
  };
}

const useUserState = create(
  devtools(
    persist(userState, {
      name: "auth-storage",
      getStorage: () => localStorage,
    }),
  ),
);

export default useUserState;
