import { StyleSheet, View, Text, Pressable } from "react-native";
import { color, inputFieldHeight } from "../../utils/themes";
import SCREEN_SIZE from "../../utils/screenSize";
import { useState } from "react";
import { SecondaryText } from "../texts/SecondaryText";

const boxTextFontValues = {
  1: { fontSize: 9 },
  2: { fontSize: 11 },
  3: { fontSize: 13 },
  4: { fontSize: 15 },
  5: { fontSize: 17 },
  6: { fontSize: 20 },
  7: { fontSize: 26 },
  8: { fontSize: 30 },
};

const titleSize = {
  SMALL: 4,
  MEDIUM: 6,
  LARGE: 8,
};

function CustomSelectBox({ items, label, handleOnSelect }) {
  const [selectedItemId, setSelectedItemId] = useState(-1);

  const handleOnPress = ({ id, title }) => {
    setSelectedItemId(id);
    handleOnSelect(title);
  };

  return (
    <>
      {label && (
        <View style={styles.labelWrapper}>
          <SecondaryText size={titleSize[SCREEN_SIZE]} color={color.DARK_BLUE}>
            {label}
          </SecondaryText>
        </View>
      )}
      <View style={styles.selectBoxListWrapper}>
        {items.map((item) => (
          <Pressable
            key={item.id}
            style={[
              styles.selectBoxItemWrapper,
              {
                width: `${(100 / items.length) * 0.95}%`,
                backgroundColor:
                  selectedItemId === item.id ? color.BLUE : color.WHITE,
              },
            ]}
            onPress={() => handleOnPress(item)}
          >
            <Text
              style={[
                styles.selectBoxText,
                {
                  color:
                    selectedItemId === item.id ? color.WHITE : color.LIGHTBLUE,
                },
              ]}
            >
              {item.title}
            </Text>
          </Pressable>
        ))}
      </View>
    </>
  );
}

export { CustomSelectBox };

const styles = StyleSheet.create({
  labelWrapper: { width: "100%", marginBottom: "2.5%" },
  selectBoxListWrapper: {
    width: "100%",
    height: inputFieldHeight[SCREEN_SIZE],
    flexDirection: "row",
    justifyContent: "space-between",
  },
  selectBoxItemWrapper: {
    height: "100%",
    borderRadius: inputFieldHeight[SCREEN_SIZE] / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  selectBoxText: {
    fontFamily: "Chewy-Regular",
    fontSize: boxTextFontValues[titleSize[SCREEN_SIZE]].fontSize,
  },
});
