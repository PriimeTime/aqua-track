import { StyleSheet, View, Text, Pressable } from "react-native";
import {
  color,
  inputFieldHeight,
  inputFontSizeValues,
} from "../../utils/themes";
import SCREEN_SIZE from "../../utils/screenSize";
import { useEffect, useState } from "react";
import { SecondaryText } from "../texts/SecondaryText";

const titleSize = {
  SMALL: 4,
  MEDIUM: 6,
  LARGE: 8,
};

function CustomSelectBox({ value, items, label, handleOnSelect }) {
  const [selectedItemId, setSelectedItemId] = useState(-1);

  useEffect(() => {
    if (value) {
      const selectedItem = items.find((item) => item.title === value);
      if (selectedItem) {
        setSelectedItemId(selectedItem.id);
      }
    }
  }, [value, items]);

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
    fontSize: inputFontSizeValues[titleSize[SCREEN_SIZE]].fontSize,
  },
});
