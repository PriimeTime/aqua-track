import { ContentPage } from "../../components/wrappers/ContentPage";
import { useEffect, useState } from "react";
import {
  setUserMetrics,
  setUserUID,
  setUserLoginState,
} from "../../store/userData";
import { useDispatch, useSelector } from "react-redux";

import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
} from "../../utils/validation";
import {
  getAuth,
  // onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { loadUserData, updateUserData } from "../../utils/database";
import { setHistory } from "../../store/drinkHistory";
import { type UserDataState } from "@/types/UserDataState";
import { type DrinkHistoryState } from "@/types/DrinkHistoryState";
import { AccountSettingsState } from "@/enums/AccountSettingsState";
import { LoginForm } from "@/components/settings/account/LoginForm";
import { RegisterForm } from "@/components/settings/account/RegisterForm";
import { AccountDetails } from "@/components/settings/account/AccountDetails";

// TODO: outsource this into themes.js
// --> also use direct fontSizes for PrimaryButton, PrimaryText, etc.

function AccountSettings() {
  const dispatch = useDispatch();
  const auth = getAuth();

  const isLoggedIn = useSelector(
    (state: UserDataState) => state.userData.userAuth.isLoggedIn
  );

  const userMetrics = useSelector(
    (state: UserDataState) => state.userData.userMetrics
  );
  const userDrinkHistory = useSelector(
    (state: DrinkHistoryState) => state.drinkHistory
  );

  const [loading, setLoading] = useState(false);
  const [accountSettingsState, setAccountSettingsState] = useState(
    AccountSettingsState.ShowLogin
  );

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
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // /**
  //  * Listen to firebase auth state changes
  //  */
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     setIsLoggedIn(!!user);
  //   });

  //   return () => unsubscribe();
  // }, []);

  const resetFormState = () => {
    setFormState({
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

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

  const handleOnLogout = async () => {
    try {
      await signOut(auth);
      dispatch(setUserLoginState(false));
      // TODO reset app state
    } catch (error) {
      console.error("Error signing out:", error);
      // Handle errors if sign out fails, such as a network error
    }
  };

  const handleInputChange = (fieldName: string, value: string) => {
    setFormState((prevForm) => ({
      ...prevForm,
      [fieldName]: value,
    }));
  };

  const resetInputValidation = (fieldName: string) => {
    if (formErrors[fieldName]) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "",
      }));
    }
  };

  const validateForm = (isRegister = false, fieldName?: string) => {
    let newErrors = { ...formErrors }; // Start with current errors
    let isValid = true;

    const validateField = (fieldKey: string) => {
      switch (fieldKey) {
        case "email":
          const emailValidation = validateEmail(isRegister, formState.email);
          console.log(`isRegister: ${isRegister}`);
          if (!emailValidation.isValid) {
            newErrors.email = emailValidation.newErrors;
            isValid = false;
          } else {
            delete newErrors.email;
          }
          break;
        case "password":
          const passwordValidation = validatePassword(
            isRegister,
            formState.password
          );
          if (!passwordValidation.isValid) {
            newErrors.password = passwordValidation.newErrors;
            isValid = false;
          } else {
            delete newErrors.password;
          }
          break;
        case "confirmPassword":
          if (isRegister) {
            const confirmPasswordValidation = validateConfirmPassword(
              isRegister,
              formState.password,
              formState.confirmPassword
            );
            if (!confirmPasswordValidation.isValid) {
              newErrors.confirmPassword = confirmPasswordValidation.newErrors;
              isValid = false;
            } else {
              delete newErrors.confirmPassword;
            }
          }
          break;
        default:
          break;
      }
    };

    if (fieldName) {
      // Validate specific field
      validateField(fieldName);
    } else {
      // Validate all fields
      validateField("email");
      validateField("password");
      if (isRegister) {
        validateField("confirmPassword");
      }
    }

    setFormErrors(newErrors); // Update state with new errors
    return isValid;
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
        return (
          <AccountDetails handleOnLogout={handleOnLogout}></AccountDetails>
        );
    }
  };

  return (
    <ContentPage key={title} title={title}>
      {renderAccountSettings()}
    </ContentPage>
  );
}

export { AccountSettings };
