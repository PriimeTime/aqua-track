import { StyleSheet, View } from "react-native";

import { BackButton } from "@/components/buttons";
import { PrimaryText } from "@/components/texts";
import { SettingsItem } from "@/components/settings/SettingsItem";
import { GradientWrapper } from "@/components/wrappers";
import { CustomFlatList } from "@/components/lists";

import { settingsList } from "@/utils/maps";
import { headerFontSize } from "@/utils/constants/components/typography";

function SettingsList() {
  return (
    <GradientWrapper style={styles.wrapper}>
      <View style={styles.backButtonWrapper}>
        <BackButton />
      </View>
      <View style={styles.headerWrapper}>
        <PrimaryText fontSize={headerFontSize}>{"Settings"}</PrimaryText>
      </View>
      <CustomFlatList
        data={settingsList}
        rowsOfListItemsOnScreen={8}
        wrapperStyles={styles.settingsListWrapper}
        renderItem={({ item }) => (
          <SettingsItem
            imageSrc={item.imageSrc}
            title={item.title}
            routeName={item.routeName}
          />
        )}
      ></CustomFlatList>
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
    width: "90%",
    left: "5%",
    flex: 1,
  },
});
