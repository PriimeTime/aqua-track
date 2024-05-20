import { View } from "react-native";

function InputContentWrapper({ children, ...props }) {
  return (
    <View style={{ marginBottom: "5%" }} {...props}>
      {children}
    </View>
  );
}

export { InputContentWrapper };
