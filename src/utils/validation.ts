const isEmailValid = (email: string) => {
  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const hasPasswordDigit = (password: string) => {
  return /[0-9]/.test(password);
};

const hasPasswordUpperCaseChar = (password: string) => {
  return /[A-Z]/.test(password);
};

const hasPasswordLowerCaseChar = (password: string) => {
  return /[a-z]/.test(password);
};

const validateEmail = (emailField: string) => {
  if (emailField.length === 0) {
    return {
      isValid: false,
      newErrors: "validation.emptyEmail",
    };
  }

  if (!isEmailValid(emailField)) {
    return {
      isValid: false,
      newErrors: "validation.invalidEmail",
    };
  }

  return { isValid: true, newErrors: "" };
};

const validateUserName = (userNameField: string) => {
  if (userNameField.length === 0) {
    return {
      isValid: false,
      newErrors: "validation.emptyUsername",
    };
  } else if (userNameField.length < 3) {
    return {
      isValid: false,
      newErrors: "validation.invalidUsername",
    };
  }
  return { isValid: true, newErrors: "" };
};

const validateWeight = (weightField: number | null) => {
  if (!weightField || weightField < 10 || weightField > 800)
    return {
      isValid: false,
      newErrors: "validation.invalidWeight",
    };
  return { isValid: true, newErrors: "" };
};

const validatePassword = (isRegister: boolean, pwField: string) => {
  const pwMinLen = 6;
  const pwMaxLen = 30;

  if (isRegister) {
    if (pwField.length < pwMinLen) {
      return {
        isValid: false,
        newErrors: `validation.passwordMinLenRule`,
        params: { pwMinLen },
      };
    }

    if (pwField.length > pwMaxLen) {
      return {
        isValid: false,
        newErrors: `validation.passwordMaxLenRule`,
        params: { pwMaxLen },
      };
    }

    if (!hasPasswordDigit(pwField)) {
      return {
        isValid: false,
        newErrors: `validation.passwordDigitRule`,
      };
    }

    if (!hasPasswordLowerCaseChar(pwField)) {
      return {
        isValid: false,
        newErrors: `validation.passwordLowercaseCharRule`,
      };
    }

    if (!hasPasswordUpperCaseChar(pwField)) {
      return {
        isValid: false,
        newErrors: `validation.passwordUppercaseCharRule`,
      };
    }
  } else {
    if (pwField.length === 0) {
      return {
        isValid: false,
        newErrors: `validation.emptyPassword`,
      };
    }
  }

  return { isValid: true, newErrors: "" };
};

const validateConfirmPassword = (
  isRegister: boolean,
  pwField: string,
  confPwField: string
) => {
  if (isRegister) {
    if (confPwField !== pwField) {
      return {
        isValid: false,
        newErrors: "validation.invalidConfPassword",
      };
    }
  }

  return { isValid: true, newErrors: "" };
};

export {
  validateUserName,
  validateWeight,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
};
