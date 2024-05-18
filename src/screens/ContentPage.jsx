import { useSafeAreaInsets } from "react-native-safe-area-context";
import { GradientWrapper } from "../components/themes/GradientWrapper";
import { View, StyleSheet, ScrollView } from "react-native";
import { BackButton } from "../components/buttons/BackButton";
import { PrimaryText } from "../components/texts/PrimaryText";
import { SCREEN_SIZE } from "../utils/constants";

const headerHeight = {
  SMALL: 5,
  MEDIUM: 6,
  LARGE: 9,
};

function ContentPage({ title, children }) {
  const insets = useSafeAreaInsets();

  return (
    <GradientWrapper style={[{ flex: 1 }, { paddingTop: insets.top }]}>
      <View style={styles.backButtonWrapper}>
        <BackButton></BackButton>
      </View>
      <View style={styles.titleWrapper}>
        <PrimaryText size={headerHeight[SCREEN_SIZE]}>{title}</PrimaryText>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={[styles.wrapper, { height: "80%" }]}>{children}</View>
      </ScrollView>
    </GradientWrapper>
  );
}

export { ContentPage };

const styles = StyleSheet.create({
  backButtonWrapper: {
    width: "90%",
    left: "5%",
    height: "10%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  wrapper: {
    width: "90%",
    left: "5%",
  },
  titleWrapper: {
    height: "10%",
    width: "90%",
    left: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
});
