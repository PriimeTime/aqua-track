import { StyleSheet, View, Text } from "react-native";

function MainHeader({ amountDrank }) {
  return (
    <View style={styles.wrapper}>
      <Text>You drank {amountDrank} ml of liquid today!</Text>
    </View>
  );
}

export { MainHeader };

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
});
