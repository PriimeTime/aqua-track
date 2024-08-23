import { View, Text, StyleSheet } from "react-native";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { GradientWrapper } from "@/components/wrappers";
import { PrimaryText } from "@/components/texts";
import { PrimaryButton } from "@/components/buttons";
import { CustomSelectBox, CustomTextField } from "@/components/input";

import { startupStyles } from "@/utils/constants";
import { paragraphMediumFontSize } from "@/utils/constants/components/typography";
import { formErrorStyles } from "@/utils/styles";
import { numToString } from "@/utils/helpers";

import { useFormValidation } from "@/hooks";

import { FormInputType } from "@/enums/input/FormInputType";
import { StartupRouteName } from "@/enums/routes/StartupRouteName";
import { CustomTextFieldInputType } from "@/enums/CustomTextFieldInputType";

import { setUserMetrics, setUsername } from "@/store/userData";

import { UserMetrics } from "@/models/UserMetrics";
import { SelectBoxItem } from "@/models/SelectBoxItem";

interface AskWrapperProps {
  question: string;
  inputType: FormInputType;
  nextRoute: StartupRouteName;
  selectBoxItems?: SelectBoxItem[];
}

/**
 * AskWrapper Component
 *
 * A reusable component designed to display a question to the user
 * and prompt them for input, such as a username, weight, or selection from a list.
 *
 * The component dynamically renders different types of input fields based on the
 * `inputType` passed to it and manages the input state internally. It also validates
 * the input using a custom validation hook and dispatches the data to the Redux store
 * upon user confirmation.
 *
 * @param {*} question - question to be displayed to the user
 * @param {*} inputType - type of input expected from the user (e.g., Weight, Username)
 * @param {*} nextRoute - route to navigate to after user clicks on continue button
 * @param selectBoxItems - array of items for select box input types
 *
 * @returns a view component that includes a question, input field, validation error message,
 * and a continue button that navigates to the next route upon successful input.
 *
 * @example
 *
 * <AskWrapper
 *  question={"Do you do exercise?"}
 *  inputType={FormInputType.ExerciseLvl}
 *  nextRoute={StartupRouteName.CalcIntake}
 *  selectBoxItems={[
 *      { id: 1, title: "No" },
 *      { id: 2, title: "Sometimes" },
 *      { id: 3, title: "Often" },
 *  ]}
 * />
 */

function AskWrapper({
  question,
  inputType,
  nextRoute,
  selectBoxItems,
}: AskWrapperProps) {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();

  const [input, setInput] = useState<string | number | null>(null);

  const {
    validateForm,
    formState,
    formErrors,
    handleInputChange,
    resetInputValidation,
  } = useFormValidation();

  /** Set default input value on component mount */
  useEffect(() => {
    if (selectBoxItems && !input) {
      setInput(selectBoxItems[0]!.title);
    }
  }, [selectBoxItems]);

  /**
   * Render a selectbox or a textfield dynamically
   */
  const renderInputField = () => {
    if (selectBoxItems) {
      return (
        <CustomSelectBox
          isVertical
          items={selectBoxItems}
          handleOnSelect={(value) => setInput(value)}
          value={input || selectBoxItems[0]!.title} // value should be the input. If there is no input yet, take first object of select array
        ></CustomSelectBox>
      );
    }

    if (inputType === FormInputType.Weight) {
      return (
        <CustomTextField
          fullWidth
          inputType={CustomTextFieldInputType.Number}
          maxLength={3}
          append={"kg"}
          value={numToString(formState.weight)}
          handleOnChangeText={(value) => {
            setInput(value);
            handleInputChange(FormInputType.Weight, value);
          }}
          handleOnFocus={() => resetInputValidation(FormInputType.Weight)}
        />
      );
    }

    return (
      <CustomTextField
        value={String(
          formState[inputType as keyof typeof formState] || input || ""
        )}
        handleOnChangeText={(text) => {
          setInput(text);
          handleInputChange(inputType, text);
        }}
        handleOnFocus={() => resetInputValidation(inputType)}
        fullWidth
        customStyles={{ height: "50%" }}
      />
    );
  };

  /**
   * Save user input to the redux store
   * and then navigate to the next route
   */
  const handleSaveInput = async () => {
    if (!validateForm(false, inputType)) return;

    const updatedMetrics: Partial<UserMetrics> = { [inputType]: input };

    if (inputType === FormInputType.Username) {
      dispatch(setUsername(String(input) || "Jordan Doe"));
    } else {
      dispatch(setUserMetrics(updatedMetrics));
    }
    navigation.navigate(nextRoute);
  };

  return (
    <GradientWrapper style={{ flex: 1 }}>
      <View style={startupStyles.wrapper}>
        <View style={styles.questionWrapper}>
          <PrimaryText fontSize={paragraphMediumFontSize}>
            {question}
          </PrimaryText>
        </View>
        <View style={styles.inputFieldWrapper}>{renderInputField()}</View>
        <View style={styles.errorTextWrapper}>
          <Text style={styles.errorText}>{formErrors[inputType]}</Text>
        </View>
        <View style={styles.continueButtonWrapper}>
          <PrimaryButton onPress={handleSaveInput}>{"Continue"}</PrimaryButton>
        </View>
      </View>
    </GradientWrapper>
  );
}

export { AskWrapper };

const styles = StyleSheet.create({
  ...formErrorStyles,
  questionWrapper: {
    height: "30%",
    justifyContent: "center",
  },
  inputFieldWrapper: {
    height: "25%",
    width: "100%",
    justifyContent: "space-between",
  },
  errorTextWrapper: {
    height: "20%",
    justifyContent: "center",
  },
  continueButtonWrapper: {
    height: "25%",
    justifyContent: "center",
  },
});
