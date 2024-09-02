import { useEffect, useState } from "react";
import firebase from "firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { setUserAccessToken, setUserRefreshToken } from "@/store/userData";

import { writeAsyncStorage } from "@/utils/storage";

const TOKEN_KEY = "authTokens";

/**
 * Custom hook to manage user authentication state with Firebase.
 *
 * Listens for auth state changes, updates Redux store with user tokens,
 * and stores tokens in async storage. Clears tokens on sign-out.
 */
const useAuth = () => {
  const [user, setUser] = useState<unknown>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebase.auth, (user) => {
      if (user) {
        setUser(user);
        const refreshToken = user.refreshToken;

        try {
          /**
           * User is signed in, get the ID token
           */
          user.getIdToken().then((accessToken) => {
            dispatch(setUserAccessToken(accessToken));
            dispatch(setUserRefreshToken(refreshToken));

            const tokens = {
              accessToken,
              refreshToken,
            };
            writeAsyncStorage(TOKEN_KEY, tokens);
          });
        } catch (error) {
          // TODO: implement force user logout here too
          console.error("Failed to get ID token or save tokens:", error);
        }
      } else {
        dispatch(setUserAccessToken(null));
        dispatch(setUserRefreshToken(null));
        AsyncStorage.removeItem(TOKEN_KEY);
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return user;
};

export { useAuth };
