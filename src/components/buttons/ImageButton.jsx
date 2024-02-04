import { Pressable, Image, StyleSheet } from "react-native";

function ImageButton({ onPress, imgSrc }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Image style={styles.button.image} source={imgSrc} resizeMode="contain" />
    </Pressable>
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
