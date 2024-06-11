import { Animated, Pressable, ViewStyle } from "react-native";
import WaterDrop from "../../../assets/icons/WaterDrop.svg";
import { useRef } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SCREEN_SIZE } from "@/utils/constants";
import { animatedScaleValue } from "@/utils/animations/animatedScaleValue";

const waterDropSizes = {
  SMALL: hp("12%"),
  MEDIUM: hp("12%"),
  LARGE: hp("15%"),
};

interface WaterDropButtonProps {
  onPress: () => void;
  style?: ViewStyle;
}

function WaterDropButton({ onPress, style, ...props }: WaterDropButtonProps) {
  const scale = useRef(animatedScaleValue(1)).current;

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
  };

  return (
    <Pressable
      {...props}
      style={style}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={{
          transform: [{ scale }],
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

export { WaterDropButton };
