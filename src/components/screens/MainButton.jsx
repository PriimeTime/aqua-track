import { StyleSheet, View } from "react-native";

import { ImageButton } from "../themes/button/ImageButton";

function MainButton({ navigation }) {
  return (
    <>
      <View style={styles.wrapper}>
        <ImageButton
          imgSrc={require("../../../assets/icons/waterbottle.png")}
          onPress={() => navigation.navigate("typeInputScreen")}
        ></ImageButton>
      </View>
    </>
  );
}

export { MainButton };

const styles = StyleSheet.create({
  wrapper: {
    width: "90%",
    left: "5%",
    height: "30%",
  },
});
