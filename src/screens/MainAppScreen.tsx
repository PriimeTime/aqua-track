import NetInfo from "@react-native-community/netinfo";
import appleHealthKit from "react-native-health";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { MainNavigation, StartupNavigation } from "@/navigation/AppNavigation";

import { setNetworkStatus } from "@/store/general";

import { useDatabaseSync, useAuth, useDataFromAsyncStorage } from "@/hooks";

import { syncSavedChangesToDatabase } from "@/utils/database";
import {
  cleanupOldEntries,
  readAsyncStorage,
  writeAsyncStorage,
} from "@/utils/storage";
import { HAS_BEEN_STARTED } from "@/utils/constants";

import { type UserDataState } from "@/types/store/UserDataState";
import { type ModalState } from "@/types/ModalState";

import { ActionModal } from "@/components/modals";

function MainAppScreen() {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const [isInternetReachable, setIsInternetReachable] = useState(false);
  const [showStartup, setShowStartup] = useState(false);

  const userMetrics = useSelector(
    (state: UserDataState) => state.userData.userMetrics
  );
  const userUID = useSelector(
    (state: UserDataState) => state.userData.userAuth.uid
  );

  const modal = useSelector((state: ModalState) => state.modal);

  const { fetchDataFromAsyncStorage } = useDataFromAsyncStorage();

  useEffect(() => {
    /** Check if first startup */
    const checkAppStarted = async () => {
      try {
        const hasBeenStarted = await readAsyncStorage<boolean>(
          HAS_BEEN_STARTED
        );
        setShowStartup(!hasBeenStarted);
      } catch (e) {
        console.error(e);
      }
    };

    /** Check HealthKit permissions */
    const permissions = {
      permissions: {
        read: [appleHealthKit.Constants.Permissions.Water],
        write: [appleHealthKit.Constants.Permissions.Water],
      },
    };

    appleHealthKit.initHealthKit(permissions, (error) => {
      if (error) {
        console.error("Error initializing HealthKit: ", error);
      }
    });
    checkAppStarted();
  }, []);

  const handleCompleteStartup = async () => {
    await writeAsyncStorage(HAS_BEEN_STARTED, true);
    setShowStartup(false);
  };

  /**
   * Listen to internet connectivity changes
   */
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(
      ({ isConnected, isInternetReachable }) => {
        if (isConnected && isInternetReachable) {
          setIsInternetReachable(true);
        } else {
          setIsInternetReachable(false);
        }

        const networkInfo = {
          isConnected: !!isConnected,
          isReachable: !!isInternetReachable,
        };

        dispatch(setNetworkStatus(networkInfo));
      }
    );

    // Cleanup the subscription on component unmount
    return () => unsubscribe();
  }, []);

  /**
   * Sync user drink history to the database
   */
  useEffect(() => {
    if (userUID && isInternetReachable) {
      syncSavedChangesToDatabase(userUID);
    }
  }, [isInternetReachable, userUID]);

  /** Handle authentication automatically */
  useAuth();

  /**
   * Sync userMetrics to database
   * when internet becomes reachable and
   * when drinkHistory changes
   */
  useDatabaseSync([userMetrics], { userMetrics }, isInternetReachable);

  /** Fetch data from async storage into the Redux store
   * and clean up entries older than a month
   */
  useEffect(() => {
    fetchDataFromAsyncStorage();
    cleanupOldEntries();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        marginBottom: insets.bottom / 2,
      }}
    >
      {modal.visible && (
        <ActionModal
          modalText={modal.modalContent.modalText}
          hasDecision={modal.modalContent.hasDecision ?? false}
        ></ActionModal>
      )}
      <NavigationContainer>
        {showStartup ? (
          <StartupNavigation
            onCompleteStartup={handleCompleteStartup}
          ></StartupNavigation>
        ) : (
          <MainNavigation></MainNavigation>
        )}
      </NavigationContainer>
    </View>
  );
}

export { MainAppScreen };
