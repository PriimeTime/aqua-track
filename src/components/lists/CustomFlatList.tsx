import { useState } from "react";
import { FlatList, StyleProp, View, ViewStyle } from "react-native";

interface CustomFlatListProps<T> {
  data: T[];
  rowsOfListItemsOnScreen: number;
  wrapperStyles: StyleProp<ViewStyle>;
  renderItem: ({ item }: { item: T }) => JSX.Element;
  listItemStyles?: StyleProp<ViewStyle>;
  columnWrapperStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  numColumns?: number;
  verticalSpacingOffset?: number;
}

/**
 * Component that renders a list of items in a grid or list layout.
 *
 * @param {*} data - array of data items to be displayed in the list
 * @param {*} rowsOfListItemsOnScreen - number of rows of list items visible on the screen
 * @param {*} wrapperStyles - styles applied to the wrapper View of the FlatList
 * @param {*} renderItem - function that returns a JSX element for rendering a single item from the data array
 * @param listItemStyles - styles applied to each list item container
 * @param columnWrapperStyle - styles applied to the FlatList's  columnWrapperStyle prop
 * @param contentContainerStyle - styles applied to the FlatList's contentContainerStyle prop
 * @param numColumns - number of columns to display in the FlatList. Defaults to 1 (single-column list)
 * @param verticalSpacingOffset - vertical spacing (in pixels) to adjust the height offset of each list item (ignore except when you use spacing between your items)
 *
 * @returns a JSX element that renders a list of items with the specified styles and layout properties
 *
 * @example
 *
 * <CustomFlatList
 *  data={listOfData}
 *  rowsOfListItemsOnScreen={5}
 *  wrapperStyles={styles.wrapperStyles}
 *  listItemStyles={styles.listItemStyles}
 *  verticalSpacingOffset={16}
 *  columnWrapperStyle={styles.columnWrapperStyle}
 *  contentContainerStyle={styles.contentContainerStyle}
 *  numColumns={2}
 *  renderItem={(item) => (
 *      <CustomItem
 *          itemId={item.itemId}
 *          title={item.title}
 *          description={item.description}
 *      />
 *  )}
 * ></CustomFlatList>
 */

function CustomFlatList<T>({
  data,
  rowsOfListItemsOnScreen,
  wrapperStyles,
  renderItem,
  listItemStyles,
  columnWrapperStyle,
  contentContainerStyle,
  numColumns = 1,
  verticalSpacingOffset = 0,
}: CustomFlatListProps<T>) {
  const [flatListHeight, setFlatListHeight] = useState(0);

  return (
    <View
      style={wrapperStyles}
      onLayout={(event) => {
        const { height } = event.nativeEvent.layout;
        setFlatListHeight(height);
      }}
    >
      <FlatList
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        numColumns={numColumns}
        contentContainerStyle={contentContainerStyle}
        columnWrapperStyle={columnWrapperStyle}
        data={data}
        renderItem={({ item }) => (
          <View
            style={[
              {
                height:
                  flatListHeight * (1 / rowsOfListItemsOnScreen) -
                  verticalSpacingOffset,
              },
              listItemStyles,
            ]}
          >
            {renderItem({ item })}
          </View>
        )}
      />
    </View>
  );
}

export { CustomFlatList };
