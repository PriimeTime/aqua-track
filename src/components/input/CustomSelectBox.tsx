import { StyleSheet, View, Text, Pressable } from "react-native";
import { useEffect, useState } from "react";

import { color, fontFamily, inputFieldHeight } from "@/utils/constants";
import { customSelectBoxLabelFontSize } from "@/utils/constants/components/input";

import { SecondaryText } from "@/components/texts";

interface CustomSelectBoxItem {
  id: number;
  title: string;
}

interface CustomSelectBoxProps<T> {
  value: T;
  items: CustomSelectBoxItem[];
  label: string;
  handleOnSelect: (value: string) => void;
}

function CustomSelectBox<T>({
  value,
  items,
  label,
  handleOnSelect,
}: CustomSelectBoxProps<T>) {
  const [selectedItemId, setSelectedItemId] = useState(-1);

  useEffect(() => {
    if (value) {
      const selectedItem = items.find((item) => item.title === value);
      if (selectedItem) {
        setSelectedItemId(selectedItem.id);
      }
    }
  }, [value, items]);

  const handleOnPress = ({ id, title }: CustomSelectBoxItem) => {
    setSelectedItemId(id);
    handleOnSelect(title);
  };

  return (
    <>
      {label && (
        <View style={styles.labelWrapper}>
          <SecondaryText
            fontSize={customSelectBoxLabelFontSize}
            color={color.DARK_BLUE}
          >
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
    height: inputFieldHeight,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  selectBoxItemWrapper: {
    height: "100%",
    borderRadius: inputFieldHeight / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  selectBoxText: {
    fontSize: customSelectBoxLabelFontSize,
    fontFamily: fontFamily.DEFAULT,
  },
});
