import { useDispatch } from "react-redux";
import { getAuth, signOut } from "firebase/auth";

import { setUserLoginState } from "@/store/userData";

import { PrimaryButton } from "@/components/buttons/PrimaryButton";

function AccountDetails() {
  const dispatch = useDispatch();
  const auth = getAuth();

  const handleOnLogout = async () => {
    try {
      await signOut(auth);
      dispatch(setUserLoginState(false));
      // TODO reset app state or ask user to reset app state
    } catch (error) {
      console.error("Error signing out:", error);
      // Handle errors if sign out fails, such as a network error
    }
  };

  return (
    <>
      <PrimaryButton onPress={handleOnLogout}>
        {"log out".toUpperCase()}
      </PrimaryButton>
    </>
  );
}

export { AccountDetails };
