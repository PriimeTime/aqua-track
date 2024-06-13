import { Modal, StyleSheet, View, Animated } from "react-native";
import { BlurView } from "expo-blur";
import { useRef, useEffect, useState } from "react";

import { PrimaryText } from "@/components/texts";
import { PrimaryButton } from "@/components/buttons";

import { SCREEN_SIZE, color, shadow } from "@/utils/constants";
import { animatedScaleValue, springAnimation } from "@/utils/animations";

const textSize = {
  SMALL: 2,
  MEDIUM: 3,
  LARGE: 5,
};

const borderRadius = {
  SMALL: 25,
  MEDIUM: 30,
  LARGE: 60,
};

interface ActionModalProps {
  modalText: string;
  onConfirm: () => void;
  onCancel?: () => void;
  hasDecision?: boolean;
}

function ActionModal({
  modalText,
  hasDecision,
  onConfirm,
  onCancel = () => {},
}: ActionModalProps) {
  const scaleValue = useRef(animatedScaleValue(0)).current;

  const [modalVisible, setModalVisible] = useState(true);
  const [blurVisible, setBlurVisible] = useState(true);

  const handleOnConfirm = () => {
    const configObject = { toValue: 0 };

    setBlurVisible(false);
    springAnimation(scaleValue, configObject, () => {
      setModalVisible(false);
      onConfirm();
    });
  };

  const handleOnCancel = () => {
    const configObject = { toValue: 0, speed: 60 };

    setBlurVisible(false);
    springAnimation(scaleValue, configObject, () => {
      setModalVisible(false);
      onCancel();
    });
  };

  useEffect(() => {
    const configObject = { toValue: 1 };
    springAnimation(scaleValue, configObject);
  }, []);

  return (
    <Modal transparent visible={modalVisible}>
      <View style={styles.centeredView}>
        {/* TODO: tint should be based on currently active mode/theme */}
        {blurVisible && (
          <BlurView style={styles.blurView} intensity={5} tint="light" />
        )}
        <Animated.View
          style={[styles.modalView, { transform: [{ scale: scaleValue }] }]}
        >
          <PrimaryText numberOfLines={2} size={textSize[SCREEN_SIZE]}>
            {modalText}
          </PrimaryText>
          <View style={styles.actionButtons}>
            {hasDecision && (
              <>
                <PrimaryButton
                  customStyles={styles.buttonStyles}
                  onPress={handleOnConfirm}
                >
                  {"Yes"}
                </PrimaryButton>
                <PrimaryButton
                  customStyles={styles.buttonStyles}
                  btnColor={color.WHITE}
                  textStyle={{ color: color.BLUE }}
                  onPress={handleOnCancel}
                >
                  {"No"}
                </PrimaryButton>
              </>
            )}
            {!hasDecision && (
              <PrimaryButton
                customStyles={styles.buttonStyles}
                onPress={onConfirm}
              >
                {"Ok"}
              </PrimaryButton>
            )}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

export { ActionModal };

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
  },
  modalView: {
    width: "90%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: borderRadius[SCREEN_SIZE],
    padding: "5%",
    ...shadow,
  },
  actionButtons: {
    justifyContent: "center",
    marginTop: "10%",
    flexDirection: "row",
  },
  buttonStyles: {
    width: "40%",
    margin: "2.5%",
  },
});
