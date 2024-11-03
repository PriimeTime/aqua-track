import { useEffect } from "react";
import { RouteProp, useNavigation } from "@react-navigation/native";
import SafariView from "react-native-safari-view";

import { color } from "@/utils/constants";

type InAppBrowserProps = {
  route: RouteProp<{ params: { url: string } }, "params">;
};

function InAppBrowser({ route }: InAppBrowserProps) {
  const { url } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    SafariView.isAvailable()
      .then(() => {
        SafariView.show({
          url,
          tintColor: color.BLUE,
          barTintColor: color.WHITE,
        });
      })
      .catch((error) => {
        console.error("SafariView is not available", error);
      });

    // Close this screen after opening Safari View
    navigation.goBack();

    // Clean up Safari View if this component is unmounted
    return () => {
      SafariView.dismiss();
    };
  }, [url, navigation]);

  return null;
}

export default InAppBrowser;
