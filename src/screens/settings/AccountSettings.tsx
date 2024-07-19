import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signOut, getAuth } from "firebase/auth";

import { setUserAuth } from "@/store/userData";

import { type UserDataState } from "@/types/store/UserDataState";

import { AccountSettingsState } from "@/enums/settings/AccountSettingsState";

import { UserAuth } from "@/models/UserAuth";

import { LoginForm, RegisterForm, AccountDetails } from "@/components/settings";
import { ContentPage } from "@/components/wrappers";

import { useResetStore } from "@/utils/store";
import { clearAuthData } from "@/utils/auth";

import { useModal } from "@/hooks/useModal";

// TODO: outsource this into themes.js
// --> also use direct fontSizes for PrimaryButton, PrimaryText, etc.

function AccountSettings() {
  const dispatch = useDispatch();
  const auth = getAuth();

  const { resetStore } = useResetStore();

  const isLoggedIn = useSelector(
    (state: UserDataState) => state.userData.userAuth.isLoggedIn
  );

  const [openModal] = useModal();

  const [loading, setLoading] = useState(false);
  const [accountSettingsState, setAccountSettingsState] = useState(
    AccountSettingsState.ShowLogin
  );

  useEffect(() => {
    if (isLoggedIn) {
      setAccountSettingsState(AccountSettingsState.ShowAccount);
    } else if (accountSettingsState === AccountSettingsState.ShowAccount) {
      setAccountSettingsState(AccountSettingsState.ShowLogin);
    }
  }, [isLoggedIn, accountSettingsState]);

  useEffect(() => {
    const getTitle = (state: AccountSettingsState) => {
      switch (state) {
        case AccountSettingsState.ShowAccount:
          return "Account";
        case AccountSettingsState.ShowLogin:
          return "Login";
        case AccountSettingsState.ShowRegister:
          return "Register";
        default:
          return "Account Settings";
      }
    };
    setTitle(getTitle(accountSettingsState));
  }, [accountSettingsState]);

  const [title, setTitle] = useState("initial title");

  const handleConfirmLogout = async () => {
    try {
      await signOut(auth);

      const userAuth: UserAuth = {
        uid: null,
        userName: null,
        email: null,
        isLoggedIn: false,
      };

      dispatch(setUserAuth(userAuth));
      await clearAuthData();
      shouldResetLocalData();
    } catch (error) {
      console.error("Error signing out:", error);
      // Handle errors if sign out fails, such as a network error
    }
  };

  const handleResetLocalData = async () => {
    setLoading(true);

    try {
      await resetStore();
    } catch (e) {
      console.error("Failed to reset store", e);
    }

    setLoading(false);
  };

  const handleLogout = () => {
    openModal({
      modalText: "Are you sure you want to log out?",
      onConfirm: handleConfirmLogout,
      hasDecision: true,
    });
  };

  const shouldResetLocalData = () => {
    openModal({
      modalText: "Reset local data?",
      onConfirm: handleResetLocalData,
      hasDecision: true,
    });
  };

  const renderAccountSettings = () => {
    switch (accountSettingsState) {
      case AccountSettingsState.ShowLogin:
        return (
          <LoginForm
            setAccountSettingsState={setAccountSettingsState}
            loading={loading}
            setLoading={setLoading}
          ></LoginForm>
        );
      case AccountSettingsState.ShowRegister:
        return (
          <RegisterForm
            setAccountSettingsState={setAccountSettingsState}
            setLoading={setLoading}
            loading={loading}
          ></RegisterForm>
        );
      case AccountSettingsState.ShowAccount:
        return <AccountDetails onLogout={handleLogout}></AccountDetails>;
    }
  };

  return (
    <ContentPage key={title} title={title}>
      {renderAccountSettings()}
    </ContentPage>
  );
}

export { AccountSettings };
