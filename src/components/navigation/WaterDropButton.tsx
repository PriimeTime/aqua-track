import { Pressable, ViewStyle } from "react-native";
import { useState } from "react";
import * as Haptics from "expo-haptics";

import WaterDrop from "../../../assets/icons/WaterDrop.svg";
import WaterDropPressed from "../../../assets/icons/WaterDropPressed.svg";

import { waterDropButtonSize } from "@/utils/constants/components/buttons";

interface WaterDropButtonProps {
  onPress: () => void;
  style?: ViewStyle;
}

function WaterDropButton({ onPress, style, ...props }: WaterDropButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <Pressable
      {...props}
      style={style}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      {isPressed ? (
        <WaterDropPressed
          width={waterDropButtonSize}
          height={waterDropButtonSize}
        />
      ) : (
        <WaterDrop width={waterDropButtonSize} height={waterDropButtonSize} />
      )}
    </Pressable>
  );
}

export { WaterDropButton };
