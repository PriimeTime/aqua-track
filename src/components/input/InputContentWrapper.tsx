import { View } from "react-native";
import { ms } from "react-native-size-matters";

interface InputContentWrapperProps {
  children: React.ReactNode;
}

function InputContentWrapper({ children, ...props }: InputContentWrapperProps) {
  return (
    <View style={{ marginBottom: ms(20) }} {...props}>
      {children}
    </View>
  );
}

export { InputContentWrapper };
