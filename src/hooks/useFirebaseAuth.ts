import {
  createUserWithEmailAndPassword,
  getAuth,
  OAuthProvider,
  sendEmailVerification,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
  UserCredential,
} from "firebase/auth";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  AppleAuthenticationScope,
  signInAsync,
} from "expo-apple-authentication";
import { useTranslation } from "react-i18next";

import { useModal } from "@/hooks/useModal";

import { setAlreadyHasAccount } from "@/store/general";

import { type UserUID } from "@/types/UserUID";
import { type UserDataState } from "@/types/store/UserDataState";
import { type DrinkHistoryState } from "@/types/DrinkHistoryState";
import { type GeneralState } from "@/types/store/GeneralState";

import { loadUserData, updateUserData } from "@/utils/database";
import { clearAuthData, saveAuthData } from "@/utils/auth";
import {
  ERROR_EMAIL_ALREADY_IN_USE,
  initialUserAuth,
  ONE_MONTH,
  ERROR_APPLE_SIGNIN_CANCELLED,
  HAS_BEEN_STARTED,
} from "@/utils/constants";
import { writeAsyncStorage } from "@/utils/storage";

import { UserAuth } from "@/models/UserAuth";
import { DrinkHistoryItem } from "@/models/DrinkHistoryItem";

import { setUserAuth, setUserMetrics } from "@/store/userData";
import { setHistory } from "@/store/drinkHistory";

import { MainRouteName } from "@/enums/routes/MainRouteName";
import { StartupRouteName } from "@/enums/routes/StartupRouteName";

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
  resetFormState: () => void,
  setLoading: (isLoading: boolean) => void,
  validateForm: (isRegister: boolean) => boolean
) => Promise<void>;

type FirebaseSignInWithApple = () => void;

type FirebaseLogout = (cb?: () => void) => void;

type FirebaseRemoveAccount = (
  password: string,
  cb?: (val: boolean) => void
) => void;

/**
 * A custom hook for Firebase authentication
 * including user registration, login, signin with apple and logout functionalities.
 *
 * This hook provides three main functions:
 * - `firebaseLogin`: Log in a user with email and password.
 * - `firebaseRegister`: Register a new user with email, password, and username.
 * - `firebaseSignInWithApple`: Sign in user with Apple
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
function useFirebaseAuth(): {
  firebaseLogin: FirebaseLogin;
  firebaseRegister: FirebaseRegister;
  firebaseSignInWithApple: FirebaseSignInWithApple;
  firebaseLogout: FirebaseLogout;
  firebaseRemoveAccount: FirebaseRemoveAccount;
} {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const auth = getAuth();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [openModal] = useModal();

  const isInternetReachable = useSelector(
    (state: GeneralState) => state.general.networkStatus.isReachable
  );

  const userMetrics = useSelector(
    (state: UserDataState) => state.userData.userMetrics
  );
  const userDrinkHistory = useSelector(
    (state: DrinkHistoryState) => state.drinkHistory
  );
  const userAuth = useSelector(
    (state: UserDataState) => state.userData.userAuth
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
          modalText: t("error.unverifiedEmailErr"),
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
        openModal({
          modalText: t("error.dataFetchFailedErr"),
        });
        console.error("Unable to load user data --> userData falsy");
      }
      setLoading(false);

      // already has account simply pings the useEffect in the MainAppScreen
      dispatch(setAlreadyHasAccount(true));
      await writeAsyncStorage(HAS_BEEN_STARTED, true);

      // Navigate to home screen after successful login
      navigation.navigate(MainRouteName.Home);
    } catch (error) {
      let errMsg = "";

      if (error instanceof Error) {
        errMsg = error.message;
      }

      if (errMsg.includes("invalid-email")) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          email: t("validation.invalidEmail"),
        }));
      } else if (errMsg.includes("invalid-credential")) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          email: t("validation.wrongEmailOrPw"),
        }));
      } else {
        openModal({
          modalText: t("error.general"),
        });
      }
      console.error(errMsg);
      setLoading(false);
    }
  };

  const firebaseRegister: FirebaseRegister = async (
    email,
    password,
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
      let userCredentials: UserCredential | null = null;
      try {
        userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      } catch (err) {
        const error = new Error(ERROR_EMAIL_ALREADY_IN_USE);
        throw error.message;
      }

      const user = userCredentials.user;
      const userUID: UserUID = user.uid;

      // Write user with userAuth object into users document in Firestore
      const userDocRef = doc(firestore, "users", userUID);
      await setDoc(
        userDocRef,
        {
          userAuth: {
            email: email,
            uid: userUID,
            userName: userAuth.userName,
            firstLogin: true,
          },
        },
        { merge: true }
      ); // Merges data with existing document

      // Send the email verification to the email the user input in the form
      await sendEmailVerification(user);

      setLoading(false);

      openModal({
        modalText: t("settings.account.verifyEmail"),
        onConfirm: () => {
          navigation.navigate(MainRouteName.Home);
        },
      });

      resetFormState();
      setLoading(false);
    } catch (error) {
      setLoading(false);

      /* Handle errors */
      switch (error) {
        case ERROR_EMAIL_ALREADY_IN_USE:
          openModal({
            modalText: t("error.emailAlreadyInUse"),
          });
          return;
      }

      openModal({
        modalText: t("error.general"),
      });
    }
  };

  const firebaseSignInWithApple = async () => {
    try {
      // Get credentials from Apple
      const appleCredentials = await signInAsync({
        requestedScopes: [
          AppleAuthenticationScope.FULL_NAME,
          AppleAuthenticationScope.EMAIL,
        ],
      });

      if (!appleCredentials.identityToken) {
        console.error("Couldn't fetch identityToken from appleCredentials");
        openModal({
          modalText: t("error.general"),
        });
        return;
      }

      // Create an OAuth credential using the Apple ID token
      const appleProvider = new OAuthProvider("apple.com");
      const credentials = appleProvider.credential({
        idToken: appleCredentials.identityToken,
      });

      // Sign in with Firebase using the Apple credentials
      const userCredential = await signInWithCredential(auth, credentials);
      const user = userCredential.user;
      const userUID = user.uid;

      // In rare cases apple could return a nil email
      if (!user.email) {
        console.error("Apple returned nil email");
        openModal({
          modalText: t("error.general"),
        });
        return;
      }

      // Load user data from Firestore
      const userData = await loadUserData(userUID);

      // Prepare auth data
      const authData: UserAuth = {
        isLoggedIn: true,
        userName:
          userData?.userAuth.userName || userAuth.userName || "Apple user :)",
        email: userData?.userAuth.email || user.email,
        uid: userUID,
      };

      // Set user auth object in redux store
      dispatch(setUserAuth(authData));

      // Check if user data is missing or incomplete
      if (
        !userData ||
        !userData.userMetrics ||
        !userData.userAuth.userName ||
        !userData.userMetrics.weight ||
        !userData.userMetrics.gender ||
        !userData.userMetrics.exerciseLvl ||
        !userData.userMetrics.measurementSystem
      ) {
        // Create or update entry for user in Firestore
        const userDocRef = doc(firestore, "users", userUID);

        await setDoc(
          userDocRef,
          {
            userAuth: {
              email: authData.email,
              uid: authData.uid,
              userName: authData.userName,
            },
          },
          { merge: true }
        );

        openModal({
          modalText: t("error.signinWithAppleBypass"),
        });

        // already has account simply pings the useEffect in the MainAppScreen
        dispatch(setAlreadyHasAccount(true));
        await writeAsyncStorage(HAS_BEEN_STARTED, true);

        navigation.navigate(StartupRouteName.UserName);
        return;
      }

      // Load one month worth of drink history
      const thirtyDaysAgo = Date.now() - ONE_MONTH;
      const userDrinkHistory =
        userData.userDrinkHistory?.filter(
          (drink: DrinkHistoryItem) => drink.date >= thirtyDaysAgo
        ) || [];

      // Hydrate redux store with fetched data
      dispatch(setHistory(userDrinkHistory));
      dispatch(setUserMetrics(userData.userMetrics));

      // Navigate to home screen after successful signin
      navigation.navigate(MainRouteName.Home);
    } catch (e) {
      if (e instanceof Error && e.message !== ERROR_APPLE_SIGNIN_CANCELLED) {
        openModal({
          modalText: t("error.general"),
        });
      }
      console.error(e);
    }
  };

  const firebaseLogout: FirebaseLogout = async (cb) => {
    try {
      // Sign out user
      await signOut(auth);

      // Reset userAuth object in store and clear user data
      dispatch(setUserAuth(initialUserAuth));
      await clearAuthData();

      // Execute callback after loggin user out
      if (cb) cb();
    } catch (error) {
      console.error("Error signing out:", error);
      openModal({
        modalText: t("error.logoutErr"),
      });
    }
  };

  const reauthenticateUser = async (providerId: string, password?: string) => {
    const user = auth.currentUser;

    if (!user) throw new Error("No authenticated user found");

    if (providerId === "password") {
      if (!userAuth.email || !password)
        throw new Error("User email or password missing");

      const credentials = EmailAuthProvider.credential(
        userAuth.email,
        password
      );

      return reauthenticateWithCredential(user, credentials);
    } else if (providerId === "apple.com") {
      const appleCredentials = await signInAsync({
        requestedScopes: [
          AppleAuthenticationScope.FULL_NAME,
          AppleAuthenticationScope.EMAIL,
        ],
      });

      if (!appleCredentials.identityToken)
        throw new Error("Failed to obtain Apple identity token");

      const credential = new OAuthProvider("apple.com").credential({
        idToken: appleCredentials.identityToken,
      });

      return reauthenticateWithCredential(user, credential);
    }

    throw new Error("Unsupported provider for reauthentication");
  };

  const firebaseRemoveAccount: FirebaseRemoveAccount = async (
    password,
    cb?
  ) => {
    try {
      if (!isInternetReachable) {
        openModal({ modalText: t("error.noInternetErr") });
        return;
      }

      const user = auth.currentUser;
      if (!user || !user.providerData[0])
        throw new Error("No user or provider data found");

      const providerId = user.providerData[0].providerId;
      await reauthenticateUser(providerId, password);

      // Delete user data from firestore
      const userDocRef = doc(firestore, "users", user.uid);
      await deleteDoc(userDocRef);

      // Delete user from firebase auth
      await deleteUser(user);

      dispatch(setUserAuth(initialUserAuth));
      await clearAuthData();

      navigation.navigate(MainRouteName.Home);
      openModal({ modalText: t("settings.account.accountDeleted") });
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes("auth/invalid-credential")
      ) {
        openModal({ modalText: t("validation.wrongPw") });
        cb && cb(false);
        return;
      }
      openModal({ modalText: t("error.removeAccountErr") });
      cb && cb(false);
    }
  };

  return {
    firebaseLogin,
    firebaseRegister,
    firebaseSignInWithApple,
    firebaseLogout,
    firebaseRemoveAccount,
  };
}

export { useFirebaseAuth };
