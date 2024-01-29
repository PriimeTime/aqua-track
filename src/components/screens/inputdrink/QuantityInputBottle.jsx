import { View, StyleSheet } from "react-native";

function QuantityInputBottle({ heightVal, liquidColor }) {
  return (
    <View style={styles.glass}>
      <View
        style={[
          styles.glass.liquid,
          { height: `${(heightVal / 100) * 80}%` },
          { backgroundColor: liquidColor },
        ]}
      ></View>
      <View style={styles.glass.light}></View>
    </View>
  );
}

export { QuantityInputBottle };

const styles = StyleSheet.create({
  glass: {
    top: 10,
    position: "absolute",
    width: 150,
    height: 250,
    backgroundColor: "#189acf", // TODO: make this gradient
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    transform: [{ perspective: 10 }, { rotateX: "-1deg" }],
    margin: 50,
    liquid: {
      position: "absolute",
      bottom: "5%",
      left: "10%",
      width: "80%",
      borderTopLeftRadius: 3,
      borderTopRightRadius: 3,
      borderBottomRightRadius: 30,
      borderBottomLeftRadius: 30,
    },
    light: {
      position: "absolute",
      left: "20%",
      bottom: "20%",
      zIndex: 1,
      width: "15%",
      height: "75%",
      borderTopLeftRadius: "0% 100%",
      borderTopRightRadius: "100% 0%",
      borderBottomRightRadius: "100% 100%",
      borderBottomLeftRadius: "0% 0%",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      transform: [{ scaleX: -1 }],
    },
  },
});
