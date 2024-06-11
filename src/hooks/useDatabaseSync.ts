import { useEffect } from "react";
import { DocumentData } from "firebase/firestore";

import { updateUserData } from "@/utils/database";

function useDatabaseSync<T extends DocumentData, D>(
  dependencies: D[],
  data: T,
  isLoggedIn: boolean,
  isInternetReachable: boolean | null,
  userUID: string | null
) {
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
  }, [isLoggedIn, isInternetReachable, ...dependencies]);
}

export { useDatabaseSync };
