import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { useModal } from "@/hooks/useModal";

import { type UserUID } from "@/types/UserUID";
import { type UserDataState } from "@/types/store/UserDataState";
import { type DrinkHistoryState } from "@/types/DrinkHistoryState";

import { loadUserData, updateUserData } from "@/utils/database";
import { clearAuthData, saveAuthData } from "@/utils/auth";
import { ONE_MONTH } from "@/utils/constants";

import { UserAuth } from "@/models/UserAuth";
import { DrinkHistoryItem } from "@/models/DrinkHistoryItem";

import { setUserAuth, setUserMetrics } from "@/store/userData";
import { setHistory } from "@/store/drinkHistory";

import { MainRouteName } from "@/enums/routes/MainRouteName";

type FirebaseLogin = (
  email: string,
  password: string,
  setFormErrors: (
    value: React.SetStateAction<{
      [key: string]: string;
    }>
  ) => void,
  setLoading: (isLoading: boolean) => void,
  validateForm: boolean
) => Promise<void>;

type FirebaseRegister = (
  email: string,
  password: string,
  userName: string,
  resetFormState: () => void,
  setLoading: (isLoading: boolean) => void,
  validateForm: (isRegister: boolean) => boolean
) => Promise<void>;

type FirebaseLogout = (shouldResetLocalData: () => void) => void;

/**
 * A custom hook for Firebase authentication, including user registration, login, and logout functionalities.
 *
 * This hook provides three main functions:
 * - `firebaseLogin`: Log in a user with email and password.
 * - `firebaseRegister`: Register a new user with email, password, and username.
 * - `firebaseLogout`: Log out the currently authenticated user.
 *
 * Note: When using functions as parameters in a hook,
 * it is generally better to return an object instead of an array.
 * This approach ensures explicit typing and avoids potential issues
 * with destructuring and undefined values.
 *
 * However, if you still prefer to return an array, make sure to
 * explicitly type the return value to prevent TypeScript from
 * inferring it as possibly undefined.
 *
 * @returns an array containing the three authentication functions
 */
function useFirebaseAuth(): [
  firebaseLogin: FirebaseLogin,
  firebaseRegister: FirebaseRegister,
  firebaseLogout: FirebaseLogout
] {
  const dispatch = useDispatch();
  const auth = getAuth();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [openModal] = useModal();

  const userMetrics = useSelector(
    (state: UserDataState) => state.userData.userMetrics
  );
  const userDrinkHistory = useSelector(
    (state: DrinkHistoryState) => state.drinkHistory
  );

  const firebaseLogin: FirebaseLogin = async (
    email,
    password,
    setFormErrors,
    setLoading,
    validateForm
  ) => {
    setLoading(true);

    // Display form errors if form invalid
    if (!validateForm) {
      setLoading(false);
      return;
    }

    try {
      // Sign in user
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredentials.user;
      const userUID: UserUID = user.uid;

      // Immediately sign out user if email not verified
      if (!user.emailVerified) {
        await signOut(auth);
        setLoading(false);
        openModal({
          modalText: "Email address not verified! Please check your inbox!",
        });
        return;
      }

      // Load user data from backend
      const userData = await loadUserData(userUID);

      const authData: UserAuth = {
        isLoggedIn: true,
        userName: userData?.userAuth.userName,
        email: userData?.userAuth.email,
        uid: userUID,
        firstLogin: userData?.userAuth.firstLogin,
      };

      // Save auth data (token, uid, name, etc.) to local storage
      saveAuthData(authData);

      // If user's first time logging in,
      // write local storage to database and then return function
      if (authData.firstLogin) {
        authData.firstLogin = false;

        const userDocRef = doc(firestore, "users", userUID);
        await setDoc(
          userDocRef,
          {
            userAuth: { ...authData },
          },
          { merge: true }
        ); // Merges data with existing document

        dispatch(setUserAuth(authData));

        // Initialize user data in Firestore
        await updateUserData(userUID, {
          userMetrics,
          userDrinkHistory,
          userAuth: {
            userName: authData.userName,
            email: authData.email,
            uid: userUID,
          },
        });
        return;
      }

      // Load entire user data from database into local storage and redux store
      if (userData) {
        const thirtyDaysAgo = Date.now() - ONE_MONTH;
        const userDrinkHistory =
          userData.userDrinkHistory?.filter(
            (drink: DrinkHistoryItem) => drink.date >= thirtyDaysAgo
          ) || [];

        dispatch(setHistory(userDrinkHistory));
        dispatch(setUserMetrics(userData.userMetrics));
        dispatch(setUserAuth(authData));
      } else {
        console.error("Unable to load user data --> userData falsy");
      }
      setLoading(false);
    } catch (error) {
      let errMsg = "";

      if (error instanceof Error) {
        errMsg = error.message;
      }

      if (errMsg.includes("invalid-email")) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          email: "Invalid e-mail",
        }));
      } else if (errMsg.includes("invalid-credential")) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          email: "Wrong e-mail or password",
        }));
      } else {
        openModal({
          modalText: "Something went wrong. Please try again.",
        });
      }
      console.error(errMsg);
      setLoading(false);
    }
  };

  const firebaseRegister: FirebaseRegister = async (
    email,
    password,
    userName,
    resetFormState,
    setLoading,
    validateForm
  ) => {
    setLoading(true);

    // Display form errors if form invalid
    if (!validateForm(true)) {
      setLoading(false);
      return;
    }

    try {
      // Create user in firebase
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredentials.user;
      const userUID: UserUID = user.uid;

      try {
        // Write user with userAuth object into users document in Firestore
        const userDocRef = doc(firestore, "users", userUID);
        await setDoc(
          userDocRef,
          {
            userAuth: {
              email: email,
              uid: userUID,
              userName: userName,
              firstLogin: true,
            },
          },
          { merge: true }
        ); // Merges data with existing document

        // Send the email verification to the email the user input in the form
        await sendEmailVerification(user);

        setLoading(false);

        openModal({
          modalText:
            "Verification Email Sent! Please check your email to verify your account!",
          onConfirm: () => {
            navigation.navigate(MainRouteName.Home);
          },
        });
      } catch (error) {
        setLoading(false);
        console.error("Error during registration:", error);
        openModal({
          modalText: "Something went wrong. Please try again later.",
        });
      }

      resetFormState();
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const firebaseLogout: FirebaseLogout = async (shouldResetLocalData) => {
    try {
      // Sign out user
      await signOut(auth);

      const userAuth: UserAuth = {
        uid: null,
        userName: null,
        email: null,
        isLoggedIn: false,
      };

      // Reset userAuth object in store and clear user data
      dispatch(setUserAuth(userAuth));
      await clearAuthData();

      // Prompt user a choice between clearing or keeping local data
      shouldResetLocalData();
    } catch (error) {
      console.error("Error signing out:", error);
      openModal({
        modalText:
          "An error occured while trying to sign out. Please try again.",
      });
    }
  };

  return [firebaseLogin, firebaseRegister, firebaseLogout];
}

export { useFirebaseAuth };
