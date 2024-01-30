import { View, Text, StyleSheet } from "react-native";

function Statistics() {
  return (
    <>
      <View style={styles.wrapper}>
        <Text>placeholder item for statistics</Text>
        {/* TODO: should be a bar with statistics */}
      </View>
    </>
  );
}

export { Statistics };

const styles = StyleSheet.create({
  wrapper: {
    width: "90%",
    left: "5%",
    height: "45%",
    alignItems: "center", // Center horizontally
    justifyContent: "center",
  },
});
