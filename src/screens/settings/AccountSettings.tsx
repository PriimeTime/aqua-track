import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signOut, getAuth } from "firebase/auth";

import { setUserAuth } from "@/store/userData";

import { type UserDataState } from "@/types/store/UserDataState";

import { AccountSettingsState } from "@/enums/settings/AccountSettingsState";

import { ModalContent } from "@/models/ModalContent";

import { LoginForm, RegisterForm, AccountDetails } from "@/components/settings";
import { ContentPage } from "@/components/wrappers";
import { ActionModal } from "@/components/modals";

import { useResetStore } from "@/utils/store";
import { emptyFunc } from "@/utils/helpers";
import { clearAuthData } from "@/utils/auth";
import { UserAuth } from "@/models/UserAuth";

// TODO: outsource this into themes.js
// --> also use direct fontSizes for PrimaryButton, PrimaryText, etc.

function AccountSettings() {
  const dispatch = useDispatch();
  const auth = getAuth();

  const { resetStore } = useResetStore();

  const isLoggedIn = useSelector(
    (state: UserDataState) => state.userData.userAuth.isLoggedIn
  );

  const [loading, setLoading] = useState(false);
  const [accountSettingsState, setAccountSettingsState] = useState(
    AccountSettingsState.ShowLogin
  );
  const [actionModalVisible, setActionModalVisible] = useState(false);
  const [actionModalContent, setActionModalContent] = useState<ModalContent>({
    modalText: "",
    onConfirm: () => {},
    onCancel: () => {},
    hasDecision: true,
  });

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

  const handleCloseDialog = () => {
    setActionModalVisible(false);
  };

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
    setActionModalVisible(false);
    setLoading(false);
  };

  const handleLogout = () => {
    const modalContent: ModalContent = {
      modalText: "Are you sure you want to log out?",
      onConfirm: handleConfirmLogout,
      onCancel: handleCloseDialog,
      hasDecision: true,
    };

    setActionModalContent(modalContent);
    setActionModalVisible(true);
  };

  const shouldResetLocalData = () => {
    const modalContent: ModalContent = {
      modalText: "Reset local data?",
      onConfirm: handleResetLocalData,
      onCancel: handleCloseDialog,
      hasDecision: true,
    };

    setActionModalContent(modalContent);
    setActionModalVisible(true);
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
      {actionModalVisible && (
        <ActionModal
          modalText={actionModalContent.modalText}
          onConfirm={actionModalContent.onConfirm}
          onCancel={actionModalContent.onCancel ?? emptyFunc}
          hasDecision={actionModalContent.hasDecision ?? false}
        ></ActionModal>
      )}
      {renderAccountSettings()}
    </ContentPage>
  );
}

export { AccountSettings };
