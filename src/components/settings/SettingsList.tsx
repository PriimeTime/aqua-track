import { StyleSheet, View, FlatList } from "react-native";
import { useState } from "react";

import { BackButton } from "@/components/buttons";
import { PrimaryText } from "@/components/texts";
import { SettingsItem } from "@/components/settings/SettingsItem";
import { GradientWrapper } from "@/components/wrappers";

import { settingsList } from "@/utils/maps";
import { headerFontSize } from "@/utils/constants/components/typography";

const rowsOfListItemsOnScreen = 8;

function SettingsList() {
  const [flatListHeight, setFlatListHeight] = useState(0);

  return (
    <GradientWrapper style={styles.wrapper}>
      <View style={styles.backButtonWrapper}>
        <BackButton />
      </View>
      <View style={styles.headerWrapper}>
        <PrimaryText fontSize={headerFontSize}>{"Settings"}</PrimaryText>
      </View>
      <View
        style={styles.settingsListWrapper}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setFlatListHeight(height);
        }}
      >
        <FlatList
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          data={settingsList}
          renderItem={({ item }) => (
            <View
              style={{
                height: flatListHeight * (1 / rowsOfListItemsOnScreen),
              }}
            >
              <SettingsItem
                imageSrc={item.imageSrc}
                title={item.title}
                routeName={item.routeName}
              />
            </View>
          )}
        />
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
    width: "90%",
    left: "5%",
    flex: 1,
  },
});
