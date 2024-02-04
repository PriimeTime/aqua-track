import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { ImageButton } from "../components/buttons/ImageButton";

function HomeWaterBottle() {
  const navigation = useNavigation();

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

export { HomeWaterBottle };

const styles = StyleSheet.create({
  wrapper: {
    padding: "5%",
    width: "90%",
    left: "5%",
    height: "35%",
  },
});
