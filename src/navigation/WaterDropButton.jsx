import { Animated, Pressable } from "react-native";
import WaterDrop from "../../assets/icons/WaterDrop.svg";
import { useRef } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import SCREEN_SIZE from "../utils/screenSize";

const waterDropSizes = {
  SMALL: hp("12%"),
  MEDIUM: hp("12%"),
  LARGE: hp("15%"),
};

export default function WaterDropButton({ onPress, ...props }) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 1.2,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 30,
      tension: 70,
      useNativeDriver: true,
    }).start();
    onPress();
  };

  return (
    <Pressable {...props} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View
        style={{
          transform: [{ scale: scale }],
        }}
      >
        <WaterDrop
          width={waterDropSizes[SCREEN_SIZE]}
          height={waterDropSizes[SCREEN_SIZE]}
        ></WaterDrop>
      </Animated.View>
    </Pressable>
  );
}
