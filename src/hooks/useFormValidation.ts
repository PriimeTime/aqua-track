import { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateUserName,
  validateWeight,
} from "@/utils/validation";

import { FormInputType } from "@/enums/input/FormInputType";

const initialFormState = {
  userName: "",
  weight: 0,
  email: "",
  password: "",
  confirmPassword: "",
};

/**
 * Custom hook for form validation.
 *
 * Manages form state and validation errors, provides functions to handle input changes,
 * reset validation states, and validate the form.
 *
 * @returns an object containing form state, errors, and validation functions
 */
function useFormValidation() {
  const { t } = useTranslation();

  const [formState, setFormState] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (fieldName: FormInputType, value: string) => {
    setFormState((prevForm) => ({
      ...prevForm,
      [fieldName]: value,
    }));
  };

  const resetInputValidation = (fieldName: FormInputType) => {
    if (formErrors[fieldName]) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "",
      }));
    }
  };

  const resetFormState = () => {
    setFormState(initialFormState);
  };

  const validateForm = (isRegister = false, fieldName?: FormInputType) => {
    let newErrors = { ...formErrors }; // Start with current errors
    let isValid = true;

    const validateField = (fieldKey: FormInputType) => {
      switch (fieldKey) {
        case FormInputType.Username:
          const userNameValidation = validateUserName(formState.userName);
          if (!userNameValidation.isValid) {
            newErrors.userName = t(userNameValidation.newErrors);
            isValid = false;
          } else {
            delete newErrors.userName;
          }
          break;
        case FormInputType.Weight:
          const weightValidation = validateWeight(formState.weight);
          if (!weightValidation.isValid) {
            newErrors.weight = t(weightValidation.newErrors);
            isValid = false;
          } else {
            delete newErrors.weight;
          }
          break;
        case FormInputType.Email:
          const emailValidation = validateEmail(formState.email);
          if (!emailValidation.isValid) {
            newErrors.email = t(emailValidation.newErrors);
            isValid = false;
          } else {
            delete newErrors.email;
          }
          break;
        case FormInputType.Password:
          const passwordValidation = validatePassword(
            isRegister,
            formState.password
          );
          if (!passwordValidation.isValid) {
            if (passwordValidation.params) {
              newErrors.password = t(
                passwordValidation.newErrors,
                passwordValidation.params
              );
            } else {
              newErrors.password = t(passwordValidation.newErrors);
            }
            isValid = false;
          } else {
            delete newErrors.password;
          }
          break;
        case FormInputType.ConfirmPassword:
          if (isRegister) {
            const confirmPasswordValidation = validateConfirmPassword(
              isRegister,
              formState.password,
              formState.confirmPassword
            );
            if (!confirmPasswordValidation.isValid) {
              newErrors.confirmPassword = t(
                confirmPasswordValidation.newErrors
              );
              isValid = false;
            } else {
              delete newErrors.confirmPassword;
            }
          }
          break;
        default:
          break;
      }
    };

    if (fieldName) {
      // Validate specific field
      validateField(fieldName);
    } else {
      // Validate all fields
      validateField(FormInputType.Email);
      validateField(FormInputType.Password);
      if (isRegister) {
        validateField(FormInputType.ConfirmPassword);
      }
    }

    setFormErrors(newErrors); // Update state with new errors
    return isValid;
  };

  return {
    formState,
    formErrors,
    setFormErrors,
    handleInputChange,
    resetInputValidation,
    validateForm,
    resetFormState,
  };
}

export { useFormValidation };
