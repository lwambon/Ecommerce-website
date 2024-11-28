import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

function userState(set) {
  return {
    user: null,
    token: null, // Store the token

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
        return { user: null, token: null }; // Clear the token during logout
      });
    },
  };
}

const useUserState = create(
  devtools(
    persist(userState, {
      name: "auth-storage",
      getStorage: () => localStorage, // Persist data in localStorage
    }),
  ),
);

export default useUserState;
