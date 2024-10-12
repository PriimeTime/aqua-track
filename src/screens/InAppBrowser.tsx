import React from "react";
import { WebView } from "react-native-webview";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";

import { color } from "@/utils/constants";
import { paragraphLargeFontSize } from "@/utils/constants/components/typography";

type InAppBrowserProps = {
  route: RouteProp<{ params: { url: string } }, "params">;
};

function InAppBrowser({ route }: InAppBrowserProps) {
  const { url } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.closeButton}>✕</Text>
        </TouchableOpacity>
      </View>

      <WebView source={{ uri: url }} style={styles.webview} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: "5%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "5%",
    backgroundColor: color.WHITE,
    borderBottomWidth: 1,
    borderBottomColor: color.BLUE,
  },
  closeButton: {
    fontSize: paragraphLargeFontSize,
    color: color.BLACK,
  },
  webview: {
    flex: 1,
  },
});

export default InAppBrowser;
