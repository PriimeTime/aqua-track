import { useEffect } from "react";
import { updateUserData } from "../utils/database";
import { DocumentData } from "firebase/firestore";

function useDatabaseSync<T extends DocumentData, D>(
  dependencies: D[],
  data: T,
  isLoggedIn: boolean,
  isInternetReachable: boolean,
  userUID: string
) {
  useEffect(() => {
    /** If user logged in AND connected to the
     * internet, sync new data to database */
    if (isLoggedIn && isInternetReachable) {
      const syncData = async () => {
        try {
          await updateUserData(userUID, data);
        } catch (err) {
          console.error(err);
        }
      };

      syncData();
    }
  }, [isLoggedIn, isInternetReachable, ...dependencies]);
}

export { useDatabaseSync };