import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { type UserDataState } from "@/types/store/UserDataState";

import { AccountSettingsState } from "@/enums/settings/AccountSettingsState";

import { LoginForm, RegisterForm, AccountDetails } from "@/components/settings";
import { ContentPage } from "@/components/wrappers";

// TODO: outsource this into themes.js
// --> also use direct fontSizes for PrimaryButton, PrimaryText, etc.

function AccountSettings() {
  const isLoggedIn = useSelector(
    (state: UserDataState) => state.userData.userAuth.isLoggedIn
  );

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
          return "Account Details";
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
