import { StyleSheet, View, FlatList } from "react-native";

import { BackButton } from "@/components/buttons";
import { PrimaryText } from "@/components/texts";
import { SettingsItem } from "@/components/settings/SettingsItem";
import { GradientWrapper } from "@/components/wrappers";

import { settingsList } from "@/utils/maps";
import {} from "@/utils/constants";
import {
  settingsListFontSize,
  settingsListItemGap,
  settingsListMarginTop,
} from "@/utils/constants/components/settings";

function SettingsList() {
  return (
    <GradientWrapper style={styles.wrapper}>
      <View style={styles.backButtonWrapper}>
        <BackButton></BackButton>
      </View>
      <View style={styles.headerWrapper}>
        <PrimaryText fontSize={settingsListFontSize}>Settings</PrimaryText>
      </View>
      <View style={styles.settingsListWrapper}>
        <FlatList
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: settingsListItemGap,
            paddingBottom: settingsListMarginTop,
          }}
          data={settingsList}
          renderItem={({ item }) => (
            <SettingsItem
              imageSrc={item.imageSrc}
              title={item.title}
              routeName={item.routeName}
            ></SettingsItem>
          )}
          // getItemLayout={(_, index) => ({
          //   length: listItemHeight[SCREEN_SIZE],
          //   offset: listItemHeight[SCREEN_SIZE] * index,
          //   index,
          // })}
          /* Below line is needed to create
            an artificial gap to the bottom
            of the screen */
          ListFooterComponent={<View />}
        ></FlatList>
      </View>
    </GradientWrapper>
  );
}

export { SettingsList };

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
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
    marginTop: settingsListMarginTop,
    height: "80%",
    width: "90%",
    left: "5%",
  },
});
