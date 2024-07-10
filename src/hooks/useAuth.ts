import { useEffect, useState } from "react";
import firebase from "firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { setUserAccessToken, setUserRefreshToken } from "@/store/userData";

const useAuth = () => {
  const [user, setUser] = useState<unknown>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebase.auth, (user) => {
      if (user) {
        setUser(user);
        const refreshToken = user.refreshToken;

        /**
         * User is signed in, get the ID token
         */
        user.getIdToken().then((accessToken) => {
          dispatch(setUserAccessToken(accessToken));
          dispatch(setUserRefreshToken(refreshToken));
          AsyncStorage.setItem("token", accessToken);
          AsyncStorage.setItem("refreshToken", refreshToken);
        });
      } else {
        dispatch(setUserAccessToken(null));
        dispatch(setUserRefreshToken(null));
        AsyncStorage.removeItem("token");
        AsyncStorage.removeItem("refreshToken");
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return user;
};

export { useAuth };
