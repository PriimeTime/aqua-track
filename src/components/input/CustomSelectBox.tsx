import { StyleSheet, View, Text, Pressable } from "react-native";
import { useEffect, useState } from "react";

import { color, fontFamily, inputFieldHeight } from "@/utils/constants";
import { paragraphMediumFontSize } from "@/utils/constants/components/typography";

import { SecondaryText } from "@/components/texts";

interface CustomSelectBoxItem {
  id: number;
  title: string;
}

interface CustomSelectBoxProps<T> {
  value: T;
  items: CustomSelectBoxItem[];
  handleOnSelect: (value: string) => void;
  label?: string;
}

/**
 * A reusable component that renders a list of selectable items (select boxes).
 * It allows the user to select one item from a list, with the selected item visually highlighted.
 * The component is fully customizable and supports dynamic data and styling.
 *
 * @template T - The type of the value prop.
 *
 * @param {*} value - currently selected value -> this should match the `title` of one of the items
 * @param {*} items - array of objects representing the selectable items -> each item should have a unique `id` and a `title` string
 * @param {*} handleOnSelect - callback function that is triggered when an item is selected -> function receives the `title` of the selected item as an argument
 * @param - label to display above the selection box list
 *
 * @returns a JSX element that renders the custom select box component
 *
 * @example
 *
 * <CustomSelectBox
 *   value={selectedItem}
 *   items={[
 *     { id: 1, title: "Option 1" },
 *     { id: 2, title: "Option 2" },
 *     { id: 3, title: "Option 3" },
 *   ]}
 *   handleOnSelect={(selectedValue) => {
 *     console.log("Selected:", selectedValue);
 *   }}
 *   label="Choose an Option"
 * />
 */

function CustomSelectBox<T>({
  value,
  items,
  handleOnSelect,
  label,
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
            fontSize={paragraphMediumFontSize}
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
    fontSize: paragraphMediumFontSize,
    fontFamily: fontFamily.DEFAULT,
  },
});
