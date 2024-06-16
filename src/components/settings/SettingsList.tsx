import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet, View, FlatList } from "react-native";

import { BackButton } from "@/components/buttons";
import { PrimaryText } from "@/components/texts";
import { SettingsItem } from "@/components/settings/SettingsItem";
import { GradientWrapper } from "@/components/wrappers";

import { listItemHeight, SCREEN_SIZE } from "@/utils/constants";
import { settingsList } from "@/utils/maps";

const headerHeight = {
  SMALL: 5,
  MEDIUM: 6,
  LARGE: 9,
};

const settingsItemGap = {
  SMALL: 8,
  MEDIUM: 10,
  LARGE: 20,
};

const listMarginTop = {
  SMALL: 50,
  MEDIUM: 50,
  LARGE: 150,
};

function SettingsList() {
  const insets = useSafeAreaInsets();

  return (
    <GradientWrapper style={[styles.wrapper, { paddingTop: insets.top }]}>
      <View style={styles.backButtonWrapper}>
        <BackButton></BackButton>
      </View>
      <View style={styles.headerWrapper}>
        <PrimaryText size={headerHeight[SCREEN_SIZE]}>Settings</PrimaryText>
      </View>
      <View style={styles.settingsListWrapper}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: settingsItemGap[SCREEN_SIZE],
            paddingBottom: listMarginTop[SCREEN_SIZE],
          }}
          data={settingsList}
          renderItem={({ item }) => (
            <SettingsItem
              imageSrc={item.imageSrc}
              title={item.title}
              routeName={item.routeName}
            ></SettingsItem>
          )}
          keyExtractor={(item) => item.id}
          getItemLayout={(_, index) => ({
            length: listItemHeight[SCREEN_SIZE],
            offset: listItemHeight[SCREEN_SIZE] * index,
            index,
          })}
        ></FlatList>
      </View>
    </GradientWrapper>
  );
}

export { SettingsList };

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
    width: "100%",
  },
  backButtonWrapper: {
    width: "90%",
    left: "5%",
    height: "10%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerWrapper: {
    height: "10%",
    width: "90%",
    left: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  settingsListWrapper: {
    marginTop: listMarginTop[SCREEN_SIZE],
    height: "80%",
    width: "90%",
    left: "5%",
  },
});
