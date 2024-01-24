import { Text, StyleSheet } from "react-native";

function getHeaderStyle(size) {
  switch (size) {
    case 1:
      return style.text.sm;
    case 2:
      return style.text.md;
    case 3:
      return style.text.lg;
    default:
      return style.text.md;
  }
}

function PrimaryText({ children, size }) {
  return <Text style={getHeaderStyle(size)}>{children}</Text>;
}

export { PrimaryText };

const style = StyleSheet.create({
  text: {
    sm: {
      fontSize: 35,
      fontWeight: 300,
    },
    md: {
      fontSize: 50,
      fontWeight: 300,
    },
    lg: {
      fontSize: 75,
      fontWeight: 300,
    },
  },
});
