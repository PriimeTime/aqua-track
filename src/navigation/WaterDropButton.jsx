import { Animated, Pressable } from "react-native";
import WaterDrop from "../../assets/icons/WaterDrop.svg";
import { useRef } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const waterDropDimensions = hp("12%");

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
  };

  return (
    <Pressable
      {...props}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Animated.View
        style={{
          transform: [{ scale: scale }],
        }}
      >
        <WaterDrop
          width={waterDropDimensions}
          height={waterDropDimensions}
        ></WaterDrop>
      </Animated.View>
    </Pressable>
  );
}
