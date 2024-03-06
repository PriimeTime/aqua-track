import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import { color, listItemHeight } from "../../utils/themes";
import { LinearGradient } from "expo-linear-gradient";
import { BackButton } from "../../components/buttons/BackButton";
import { PrimaryText } from "../../components/texts/PrimaryText";
import SCREEN_SIZE from "../../utils/screenSize";
import { SettingsItem } from "./SettingsItem";
import { FlatList } from "react-native";
import { settingsList } from "../../utils/maps";

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

function SettingsList() {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={[
        color.APP_PRIMARY_BACKGROUND_FIRST_GRADIENT,
        color.APP_PRIMARY_BACKGROUND_SECOND_GRADIENT,
      ]}
      style={[styles.wrapper, { paddingTop: insets.top }]}
    >
      <View style={styles.backButtonWrapper}>
        <BackButton></BackButton>
      </View>
      <View style={styles.headerWrapper}>
        <PrimaryText size={headerHeight[SCREEN_SIZE]}>Settings</PrimaryText>
      </View>
      <View style={styles.settingsListWrapper}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: settingsItemGap[SCREEN_SIZE] }}
          data={settingsList}
          renderItem={({ item }) => (
            <SettingsItem
              imageSrc={item.imageSrc}
              title={item.title}
              routeName={item.routeName}
            ></SettingsItem>
          )}
          keyExtractor={(item) => item.id}
          getItemLayout={(data, index) => ({
            length: listItemHeight[SCREEN_SIZE],
            offset: listItemHeight[SCREEN_SIZE] * index,
            index,
          })}
        ></FlatList>
      </View>
    </LinearGradient>
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
    height: "80%",
    width: "90%",
    left: "5%",
  },
});
