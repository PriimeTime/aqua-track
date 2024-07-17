import { Pressable, Animated, StyleSheet } from "react-native";
import { useRef } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector } from "react-redux";

import { type UserDataState } from "@/types/store/UserDataState";
import { type GeneralState } from "@/types/store/GeneralState";

import { color } from "@/utils/constants";
import {
  historyButtonIconSize,
  historyButtonRadius,
} from "@/utils/constants/components/history";
import { animateButtonPress, animatedScaleValue } from "@/utils/animations";

import { DrinkHistoryItem } from "@/models/DrinkHistoryItem";

import { useRemoveDrink } from "@/hooks";

function HistoryDeleteButton({ item }: { item: DrinkHistoryItem }) {
  const isInternetReachable = useSelector(
    (state: GeneralState) => state.general.networkStatus.isReachable
  );
  const userUID = useSelector(
    (state: UserDataState) => state.userData.userAuth.uid
  );

  const scaleValue = useRef(animatedScaleValue(1)).current;

  const { removeDrink } = useRemoveDrink(item, userUID, isInternetReachable);

  const handleOnPress = () => {
    removeDrink();
  };

  const handleOnPressIn = () => {
    animateButtonPress(scaleValue, animatedScaleValue(0.85));
  };

  const handleOnPressOut = () => {
    animateButtonPress(scaleValue, animatedScaleValue(1));
  };

  return (
    <Animated.View
      style={[
        styles.buttonWrapper,
        {
          transform: [{ scale: scaleValue }],
        },
      ]}
    >
      <Pressable
        style={styles.buttonBase}
        onPress={handleOnPress}
        onPressIn={handleOnPressIn}
        onPressOut={handleOnPressOut}
      >
        <Ionicons
          color={color.WHITE}
          size={historyButtonIconSize}
          name="trash"
        />
      </Pressable>
    </Animated.View>
  );
}

export { HistoryDeleteButton };

const styles = StyleSheet.create({
  buttonWrapper: {
    left: "15%",
    top: "10%",
    width: "70%",
    height: "80%",
  },
  buttonBase: {
    width: "100%",
    height: "100%",
    backgroundColor: color.RED,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: historyButtonRadius,
  },
});
