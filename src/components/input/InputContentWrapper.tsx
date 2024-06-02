import { View } from "react-native";

interface InputContentWrapperProps {
  children: React.ReactNode;
}

function InputContentWrapper({ children, ...props }: InputContentWrapperProps) {
  return (
    <View style={{ marginBottom: "5%" }} {...props}>
      {children}
    </View>
  );
}

export { InputContentWrapper };
