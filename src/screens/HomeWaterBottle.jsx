import { useNavigation } from "@react-navigation/native";
import { ImageButton } from "../components/buttons/ImageButton";

function HomeWaterBottle() {
  const navigation = useNavigation();

  return (
    <>
      <ImageButton
        imgSrc={require("../../assets/icons/mainwaterbottle.png")}
        onPress={() => navigation.navigate("TypeInputScreen")}
      ></ImageButton>
    </>
  );
}

export { HomeWaterBottle };
