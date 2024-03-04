import { View, Image, StyleSheet } from "react-native";
import { PrimaryText } from "../../components/texts/PrimaryText";
import SCREEN_SIZE from "../../utils/screenSize";
import { settingsImageMap } from "../../utils/maps";
import { color, listItemHeight } from "../../utils/themes";

const titleSize = {
  SMALL: 1,
  MEDIUM: 5,
  LARGE: 7,
};

const itemBorderRadius = {
  SMALL: 15,
  MEDIUM: 20,
  LARGE: 25,
};

const itemBorderWidth = {
  SMALL: 1.5,
  MEDIUM: 2,
  LARGE: 3,
};

function SettingsItem({ title, imageSrc }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.itemIconWrapper}>
        <Image
          style={styles.itemIcon}
          source={settingsImageMap[imageSrc]}
        ></Image>
      </View>
      <View style={styles.itemTitleWrapper}>
        <PrimaryText size={titleSize[SCREEN_SIZE]}>{title}</PrimaryText>
      </View>
    </View>
  );
}

export { SettingsItem };

const styles = StyleSheet.create({
  wrapper: {
    height: listItemHeight[SCREEN_SIZE],
    width: "100%",
    flexDirection: "row",
    backgroundColor: color.WHITE,
    borderColor: color.LIGHTBLUE,
    borderRadius: itemBorderRadius[SCREEN_SIZE],
    borderWidth: itemBorderWidth[SCREEN_SIZE],
  },
  itemIconWrapper: {
    width: "20%",
    height: "100%",
  },
  itemIcon: {
    width: "60%",
    height: "60%",
    left: "20%",
    top: "20%",
    objectFit: "contain",
  },
  itemTitleWrapper: {
    justifyContent: "center",
    alignItems: "start",
    width: "80%",
    height: "100%",
  },
});
