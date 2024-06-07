import { ContentPage } from "../../components/wrappers/ContentPage";
import { useEffect, useState } from "react";
import {
  setUserMetrics,
  setUserUID,
  setUserLoginState,
} from "../../store/userData";
import { useDispatch, useSelector } from "react-redux";

import {
  getAuth,
  // onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { loadUserData, updateUserData } from "../../utils/database";
import { setHistory } from "../../store/drinkHistory";
import { type UserDataState } from "@/types/UserDataState";
import { type DrinkHistoryState } from "@/types/DrinkHistoryState";
import { AccountSettingsState } from "@/enums/AccountSettingsState";
import { LoginForm } from "@/components/settings/account/LoginForm";
import { RegisterForm } from "@/components/settings/account/RegisterForm";
import { AccountDetails } from "@/components/settings/account/AccountDetails";
import { useFormValidation } from "@/hooks/useFormValidation";

// TODO: outsource this into themes.js
// --> also use direct fontSizes for PrimaryButton, PrimaryText, etc.

function AccountSettings() {
  const isLoggedIn = useSelector(
    (state: UserDataState) => state.userData.userAuth.isLoggedIn
  );
  const userMetrics = useSelector(
    (state: UserDataState) => state.userData.userMetrics
  );
  const userDrinkHistory = useSelector(
    (state: DrinkHistoryState) => state.drinkHistory
  );

  const dispatch = useDispatch();
  const auth = getAuth();

  const [loading, setLoading] = useState(false);
  const [accountSettingsState, setAccountSettingsState] = useState(
    AccountSettingsState.ShowLogin
  );
  const {
    formState,
    formErrors,
    setFormErrors,
    handleInputChange,
    resetInputValidation,
    validateForm,
    resetFormState,
  } = useFormValidation();

  useEffect(() => {
    switch (accountSettingsState) {
      case AccountSettingsState.ShowAccount:
        setTitle("Account Details");
        break;
      case AccountSettingsState.ShowLogin:
        setTitle("Login");
        break;
      case AccountSettingsState.ShowRegister:
        setTitle("Register");
        break;
    }

    if (isLoggedIn) {
      setAccountSettingsState(AccountSettingsState.ShowAccount);
    } else if (
      !isLoggedIn &&
      accountSettingsState === AccountSettingsState.ShowAccount
    ) {
      setAccountSettingsState(AccountSettingsState.ShowLogin);
    }
  }, [isLoggedIn, accountSettingsState]);

  const [title, setTitle] = useState("initial title");

  const redirectToRegister = () => {
    setAccountSettingsState(AccountSettingsState.ShowRegister);
  };

  const redirectToLogin = () => {
    setAccountSettingsState(AccountSettingsState.ShowLogin);
  };

  const handleOnLogin = async () => {
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        formState.email,
        formState.password
      );

      const user = userCredentials.user;
      dispatch(setUserUID(user.uid));

      const userData = await loadUserData(user.uid);

      if (userData) {
        dispatch(setHistory(userData.userDrinkHistory));
        dispatch(setUserMetrics(userData.userMetrics));
        dispatch(setUserLoginState(true));
      } else {
        console.error("Unable to load user data --> userData falsy");
      }
      setLoading(false);
    } catch (error) {
      let errMsg = "";

      if (error instanceof Error) {
        errMsg = error.message;
      }

      // TODO: create an invisible input field below all others and display
      // general error messages there

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
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          email: "Something went wrong. Please try again.",
        }));
      }
      setLoading(false);
    }
  };

  const handleOnRegister = async () => {
    setLoading(true);

    if (!validateForm(true)) {
      return;
    }

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        formState.email,
        formState.password
      );

      // TODO: show alert box here with successful register message

      const user = userCredentials.user;
      const userUID = user.uid;

      dispatch(setUserUID(userUID));

      // Initialize user data in Firestore after successful registration
      await updateUserData(userUID, {
        userMetrics,
        userDrinkHistory,
        userUID,
      });

      dispatch(setUserLoginState(true));

      // setTimeout(() => {
      //   setShowRegisterPage(false);
      // }, 10000);

      resetFormState();
      // setTitle("Login"); // TODO: set this to Account instead
      // setShowRegisterPage(false);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const renderAccountSettings = () => {
    switch (accountSettingsState) {
      case AccountSettingsState.ShowLogin:
        return (
          <LoginForm
            handleInputChange={handleInputChange}
            handleOnLogin={handleOnLogin}
            redirectToRegister={redirectToRegister}
            validateForm={validateForm}
            resetInputValidation={resetInputValidation}
            formState={formState}
            formErrors={formErrors}
            loading={loading}
          ></LoginForm>
        );
      case AccountSettingsState.ShowRegister:
        return (
          <RegisterForm
            handleInputChange={handleInputChange}
            handleOnRegister={handleOnRegister}
            redirectToLogin={redirectToLogin}
            validateForm={validateForm}
            resetInputValidation={resetInputValidation}
            formState={formState}
            formErrors={formErrors}
            loading={loading}
          ></RegisterForm>
        );
      case AccountSettingsState.ShowAccount:
        return <AccountDetails></AccountDetails>;
    }
  };

  return (
    <ContentPage key={title} title={title}>
      {renderAccountSettings()}
    </ContentPage>
  );
}

export { AccountSettings };
