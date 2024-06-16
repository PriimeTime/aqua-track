import { useState } from "react";

import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateUserName,
} from "@/utils/validation";

function useFormValidation() {
  const [formState, setFormState] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (fieldName: string, value: string) => {
    setFormState((prevForm) => ({
      ...prevForm,
      [fieldName]: value,
    }));
  };

  const resetInputValidation = (fieldName: string) => {
    if (formErrors[fieldName]) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "",
      }));
    }
  };

  const resetFormState = () => {
    setFormState({
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const validateForm = (isRegister = false, fieldName?: string) => {
    let newErrors = { ...formErrors }; // Start with current errors
    let isValid = true;

    const validateField = (fieldKey: string) => {
      switch (fieldKey) {
        case "userName":
          const userNameValidation = validateUserName(formState.userName);
          if (!userNameValidation.isValid) {
            newErrors.userName = userNameValidation.newErrors;
            isValid = false;
          } else {
            delete newErrors.userName;
          }
          break;
        case "email":
          const emailValidation = validateEmail(isRegister, formState.email);
          console.log(`isRegister: ${isRegister}`);
          if (!emailValidation.isValid) {
            newErrors.email = emailValidation.newErrors;
            isValid = false;
          } else {
            delete newErrors.email;
          }
          break;
        case "password":
          const passwordValidation = validatePassword(
            isRegister,
            formState.password
          );
          if (!passwordValidation.isValid) {
            newErrors.password = passwordValidation.newErrors;
            isValid = false;
          } else {
            delete newErrors.password;
          }
          break;
        case "confirmPassword":
          if (isRegister) {
            const confirmPasswordValidation = validateConfirmPassword(
              isRegister,
              formState.password,
              formState.confirmPassword
            );
            if (!confirmPasswordValidation.isValid) {
              newErrors.confirmPassword = confirmPasswordValidation.newErrors;
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
      validateField("email");
      validateField("password");
      if (isRegister) {
        validateField("confirmPassword");
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
