import { StyleSheet, View } from "react-native";

import { ImageButton } from "../components/buttons/ImageButton";

function MainButton({ navigation }) {
  return (
    <>
      <View style={styles.wrapper}>
        <ImageButton
          imgSrc={require("../../assets/icons/waterbottle.png")}
          onPress={() => navigation.navigate("typeInputScreen")}
        ></ImageButton>
      </View>
    </>
  );
}

export { MainButton };

const styles = StyleSheet.create({
  wrapper: {
    padding: "5%",
    width: "90%",
    left: "5%",
    height: "35%",
  },
});