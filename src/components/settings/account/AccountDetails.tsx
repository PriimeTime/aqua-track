import { PrimaryButton } from "@/components/buttons/PrimaryButton";

interface AccountDetailsProps {
  onLogout: () => void;
}

function AccountDetails({ onLogout }: AccountDetailsProps) {
  return (
    <>
      <PrimaryButton onPress={onLogout}>
        {"log out".toUpperCase()}
      </PrimaryButton>
    </>
  );
}

export { AccountDetails };
