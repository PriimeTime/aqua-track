import { useEffect, useState } from "react";
import firebase from "firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { setUserAccessToken, setUserRefreshToken } from "@/store/userData";

const TOKEN_KEY = "authTokens";

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
            AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
          });
        } catch (error) {
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
