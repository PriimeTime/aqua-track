import { View, StyleSheet, ScrollView } from "react-native";

import { GradientWrapper } from "@/components/wrappers/GradientWrapper";
import { BackButton } from "@/components/buttons";
import { PrimaryText } from "@/components/texts";

import { contentPageFontSize } from "@/utils/constants/components";

interface ContentPageProps {
  title: string;
  children: React.ReactNode;
}

function ContentPage({ title, children }: ContentPageProps) {
  return (
    <GradientWrapper style={styles.gradientWrapper}>
      <View style={styles.backButtonWrapper}>
        <BackButton></BackButton>
      </View>
      <View style={styles.titleWrapper}>
        <PrimaryText fontSize={contentPageFontSize}>{title}</PrimaryText>
      </View>
      <ScrollView alwaysBounceVertical={false}>
        <View style={styles.wrapper}>{children}</View>
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
  gradientWrapper: {
    flex: 1,
  },
  wrapper: {
    width: "90%",
    height: "80%",
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
