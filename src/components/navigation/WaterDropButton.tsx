import { Pressable, ViewStyle } from "react-native";
import { useState } from "react";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

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
    ReactNativeHapticFeedback.trigger("selection");
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
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
