import { Animated, Pressable, ViewStyle } from "react-native";
import { useRef } from "react";

import WaterDrop from "../../../assets/icons/WaterDrop.svg";

import { waterDropButtonSize } from "@/utils/constants/components/buttons";
import { animatedScaleValue } from "@/utils/animations";

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
          width={waterDropButtonSize}
          height={waterDropButtonSize}
        ></WaterDrop>
      </Animated.View>
    </Pressable>
  );
}

export { WaterDropButton };
