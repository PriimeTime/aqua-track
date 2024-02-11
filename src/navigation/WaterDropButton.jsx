import { Animated, Pressable, View } from "react-native";
import WaterDrop from "../../assets/icons/WaterDrop.svg";
import { useRef } from "react";

export default function WaterDropButton({ onPress }) {
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
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Animated.View
        style={{
          transform: [{ scale: scale }],
        }}
      >
        <WaterDrop width={110} height={110}></WaterDrop>
      </Animated.View>
    </Pressable>
  );
}
