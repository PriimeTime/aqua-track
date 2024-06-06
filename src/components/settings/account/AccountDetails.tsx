import { PrimaryButton } from "@/components/buttons/PrimaryButton";

interface AccountDetailsProps {
  handleOnLogout: () => void;
}

function AccountDetails({ handleOnLogout }: AccountDetailsProps) {
  return (
    <>
      <PrimaryButton onPress={handleOnLogout}>
        {"log out".toUpperCase()}
      </PrimaryButton>
    </>
  );
}

export { AccountDetails };
