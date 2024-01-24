import { View, Text, Pressable, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function TypeInputScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[{ paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.header.text}>What did you drink?</Text>
      </View>
      <View style={styles.drinkTypeSelectionWrapper}>
        <Text>placeholder for drink selection</Text>
      </View>
      <View style={styles.footer}>
        <Pressable
          style={styles.footer.button}
          onPress={() => navigation.navigate("home")}
        >
          <Text style={styles.footer.button.text}>
            Yep, that's what I drank
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export { TypeInputScreen };

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
    text: {
      fontSize: 35,
      fontWeight: 300,
    },
  },
  drinkTypeSelectionWrapper: {
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    width: "100%",
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
    button: {
      paddingVertical: 20,
      paddingHorizontal: 60,
      borderRadius: 20,
      elevation: 3,
      backgroundColor: "#007AFF", // default apple button blue color code
      text: {
        textAlign: "center",
        fontSize: 25,
        lineHeight: 30,
        fontWeight: 400,
        letterSpacing: 5,
        color: "white",
      },
    },
  },
});
