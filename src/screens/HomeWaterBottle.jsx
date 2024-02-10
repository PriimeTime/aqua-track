import { Image } from "react-native";
import { StyleSheet } from "react-native";

function HomeWaterBottle({ imgSrc }) {
  return (
    <Image style={styles.button.image} source={imgSrc} resizeMode="contain" />
  );
}

export { HomeWaterBottle };

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    image: {
      height: "100%",
      width: "100%",
    },
  },
});
