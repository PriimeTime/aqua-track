import { Text, StyleSheet } from "react-native";

function getHeaderStyle(size) {
  switch (size) {
    case 1:
      return style.header.sm;
    case 2:
      return style.header.md;
    case 3:
      return style.header.lg;
    default:
      return style.header.md;
  }
}

function PrimaryHeader({ children, size }) {
  return <Text style={getHeaderStyle(size)}>{children}</Text>;
}

export { PrimaryHeader };

const style = StyleSheet.create({
  header: {
    sm: {
      textAlign: "center",
      fontSize: 25,
      fontWeight: 500,
    },
    md: {
      textAlign: "center",
      fontSize: 30,
      fontWeight: 500,
    },
    lg: {
      textAlign: "center",
      fontSize: 35,
      fontWeight: 500,
    },
  },
});
