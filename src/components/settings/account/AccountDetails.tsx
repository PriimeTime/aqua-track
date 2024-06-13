import { useDispatch } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";

import { setUserLoginState } from "@/store/userData";

import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { ActionModal } from "@/components/modals";

function AccountDetails() {
  const dispatch = useDispatch();
  const auth = getAuth();

  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);

  const handleConfirmLogout = async () => {
    try {
      await signOut(auth);
      dispatch(setUserLoginState(false));
      // TODO reset app state or ask user to reset app state
    } catch (error) {
      console.error("Error signing out:", error);
      // Handle errors if sign out fails, such as a network error
    }
  };

  const handleCancelLogout = () => {
    setConfirmDialogVisible(false);
  };

  const handleOnLogout = () => {
    setConfirmDialogVisible(true);
  };

  return (
    <>
      {confirmDialogVisible && (
        <ActionModal
          modalText={"Do you really want to logout?"}
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
          hasDecision
        ></ActionModal>
      )}
      <PrimaryButton onPress={handleOnLogout}>
        {"log out".toUpperCase()}
      </PrimaryButton>
    </>
  );
}

export { AccountDetails };
