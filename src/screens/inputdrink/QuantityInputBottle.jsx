import { View, StyleSheet } from "react-native";
import { shadow, color } from "../../utils/themes";

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
    ...shadow,
    top: 10,
    width: 200,
    height: 400,
    borderColor: color.CUP_COLOR,
    borderBottomWidth: 12,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    liquid: {
      position: "absolute",
      bottom: "2.5%",
      left: "5%",
      width: "90%",
      borderRadius: 8,
    },
    // light: {
    //   position: "absolute",
    //   left: "20%",
    //   bottom: "20%",
    //   zIndex: 1,
    //   width: "15%",
    //   height: "75%",
    //   borderTopLeftRadius: "0% 100%",
    //   borderTopRightRadius: "100% 0%",
    //   borderBottomRightRadius: "100% 100%",
    //   borderBottomLeftRadius: "0% 0%",
    //   backgroundColor: "rgba(255, 255, 255, 0.1)",
    //   transform: [{ scaleX: -1 }],
    // },
  },
});
