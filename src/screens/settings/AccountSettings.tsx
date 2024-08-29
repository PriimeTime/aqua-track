import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { type UserDataState } from "@/types/store/UserDataState";

import { AccountSettingsState } from "@/enums/settings/AccountSettingsState";

import {
  LoginForm,
  RegisterForm,
  AccountDetails,
  ForgotPassword,
} from "@/components/settings";
import { ContentPage } from "@/components/wrappers";

import { useResetStore } from "@/utils/store";

import { useModal, useFirebaseAuth } from "@/hooks";

// TODO: outsource this into themes.js
// --> also use direct fontSizes for PrimaryButton, PrimaryText, etc.

function AccountSettings() {
  const { t } = useTranslation();

  const { firebaseLogout } = useFirebaseAuth();

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
          return t("settings.account.accountHeader");
        case AccountSettingsState.ShowLogin:
          return t("settings.account.loginHeader");
        case AccountSettingsState.ShowRegister:
          return t("settings.account.registerHeader");
        case AccountSettingsState.ShowForgotPassword:
          return t("settings.account.forgotPwHeader");
        default:
          return t("settings.account.accountSettingsHeader");
      }
    };
    setTitle(getTitle(accountSettingsState));
  }, [accountSettingsState]);

  const [title, setTitle] = useState(t("settings.account.accountHeader"));

  const handleConfirmLogout = () => {
    firebaseLogout(shouldResetLocalData);
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
      modalText: t("settings.account.logoutPrompt"),
      onConfirm: handleConfirmLogout,
      hasDecision: true,
    });
  };

  const shouldResetLocalData = () => {
    openModal({
      modalText: t("settings.account.resetLocalData"),
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
      case AccountSettingsState.ShowForgotPassword:
        return (
          <ForgotPassword
            setAccountSettingsState={setAccountSettingsState}
          ></ForgotPassword>
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
