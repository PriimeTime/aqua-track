import { TouchableOpacity, Image, StyleSheet } from "react-native";

function ImageButton({ onPress, imgSrc }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image style={styles.button.image} source={imgSrc} resizeMode="contain" />
    </TouchableOpacity>
  );
}

export { ImageButton };

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
