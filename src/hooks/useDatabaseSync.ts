import { useEffect } from "react";
import { DocumentData } from "firebase/firestore";
import { useSelector } from "react-redux";

import { type UserDataState } from "@/types/store/UserDataState";
import { type UserUID } from "@/types/UserUID";

import { updateUserData } from "@/utils/database";

function useDatabaseSync<T extends DocumentData, D>(
  dependencies: D[],
  data: T,
  isInternetReachable: boolean | null
) {
  const userAuth = useSelector(
    (state: UserDataState) => state.userData.userAuth
  );

  const isLoggedIn = userAuth.isLoggedIn;
  const userUID: UserUID = userAuth.uid;

  // TODO: automatically log in user if not logged in (maybe save login state in async storage?)

  useEffect(() => {
    /** If user logged in AND connected to the
     * internet, sync new data to database */
    if (isLoggedIn && isInternetReachable) {
      const syncData = async () => {
        if (userUID) {
          try {
            await updateUserData(userUID, data);
          } catch (err) {
            console.error(err);
          }
        } else {
          console.error("Failed to update user data: userUID is undefined");
        }
      };

      syncData();
    }
  }, [isInternetReachable, ...dependencies]);
}

export { useDatabaseSync };
