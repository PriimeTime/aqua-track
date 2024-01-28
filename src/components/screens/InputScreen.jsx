import { StyleSheet, View } from "react-native";

import { ImageButton } from "../themes/button/ImageButton";

function InputScreen({ navigation }) {
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

export { InputScreen };

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "30%",
  },
});
