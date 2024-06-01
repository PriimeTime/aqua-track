import { Image, ImageSourcePropType } from "react-native";
import { StyleSheet } from "react-native";

function HomeWaterBottle({ imgSrc }: { imgSrc: ImageSourcePropType }) {
  return <Image style={styles.image} source={imgSrc} resizeMode="contain" />;
}

export { HomeWaterBottle };

const styles = StyleSheet.create({
  image: {
    height: "100%",
    width: "100%",
  },
});
