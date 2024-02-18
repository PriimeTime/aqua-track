import { View, StyleSheet, Animated, FlatList } from "react-native";
import { useDispatch } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import { PrimaryText } from "../../components/texts/PrimaryText";
import { CardButton } from "../../components/buttons/CardButton";

import { setType } from "../../store/store";
import { drinkTypeList } from "../../utils/maps";
import { color, dimensions } from "../../utils/themes";
import { BackButton } from "../../components/buttons/BackButton";

function TypeInputScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const scaleValue = useRef(new Animated.Value(1)).current;

  const handleButtonPress = (drink) => {
    dispatch(setType(drink));
    navigation.navigate("QuantityInputScreen");
  };

  return (
    <LinearGradient
      colors={[
        color.APP_PRIMARY_BACKGROUND_FIRST_GRADIENT,
        color.APP_PRIMARY_BACKGROUND_SECOND_GRADIENT,
      ]}
      style={[styles.wrapper, { paddingTop: insets.top }]}
    >
      <View style={styles.backButton}>
        <BackButton></BackButton>
      </View>
      <View style={styles.header}>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <PrimaryText size={3}>What did you drink?</PrimaryText>
        </Animated.View>
      </View>
      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        style={styles.drinkTypeSelectionWrapper}
        data={drinkTypeList}
        renderItem={({ item }) => (
          <CardButton
            style={{
              width: "46%",
              padding: "2%",
              height: dimensions.CARD_BUTTON_HEIGHT_PHONE,
            }}
            imageSrc={item.imageSrc}
            onPress={() => handleButtonPress(item)}
          >
            {item.label}
          </CardButton>
        )}
        keyExtractor={(item) => item.typeID}
        getItemLayout={(data, index) => ({
          length: dimensions.CARD_BUTTON_HEIGHT_PHONE,
          offset: dimensions.CARD_BUTTON_HEIGHT_PHONE * index,
          index,
        })}
      ></FlatList>
    </LinearGradient>
  );
}

export { TypeInputScreen };

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: color.APP_PRIMARY_BACKGROUND,
    flex: 1,
  },
  backButton: {
    width: "90%",
    left: "5%",
    height: "10%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  header: {
    width: "90%",
    left: "5%",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  drinkTypeSelectionWrapper: {
    width: "90%",
    left: "5%",
  },
  drinkTypeContentContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
