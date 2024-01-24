import { StyleSheet, View, Image, TouchableOpacity } from "react-native";

function InputScreen({ navigation }) {
  return (
    <>
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={styles.wrapper.imageButton}
          onPress={() => navigation.navigate("quantityInputScreen")}
        >
          <Image
            style={styles.wrapper.imageButton.image}
            source={require("../../assets/icons/waterbottle.png")}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

export { InputScreen };

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "30%",
    imageButton: {
      justifyContent: "center",
      alignItems: "center",
      image: {
        height: "100%",
        width: "100%",
      },
    },
  },
});
