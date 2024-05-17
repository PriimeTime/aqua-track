import { useEffect } from "react";
import { updateUserData } from "../utils/database";

function useDatabaseSync(
  dependencies,
  data,
  isLoggedIn,
  isInternetReachable,
  userUID
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
