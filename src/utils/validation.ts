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
      newErrors: "Please enter your e-mail",
    };
  }

  if (!isEmailValid(emailField)) {
    return {
      isValid: false,
      newErrors: "Invalid e-mail.",
    };
  }

  return { isValid: true, newErrors: "" };
};

const validateUserName = (userNameField: string) => {
  if (userNameField.length === 0) {
    return {
      isValid: false,
      newErrors: "Please enter your username",
    };
  } else if (userNameField.length < 3) {
    return {
      isValid: false,
      newErrors: "Your username must be at least 3 characters long!",
    };
  }
  return { isValid: true, newErrors: "" };
};

const validatePassword = (isRegister: boolean, pwField: string) => {
  const pwMinLen = 6;
  const pwMaxLen = 30;

  if (isRegister) {
    if (pwField.length < pwMinLen) {
      return {
        isValid: false,
        newErrors: `Password must be at least ${pwMinLen} characters`,
      };
    }

    if (pwField.length > pwMaxLen) {
      return {
        isValid: false,
        newErrors: `Password must not be longer than ${pwMaxLen} characters`,
      };
    }

    if (!hasPasswordDigit(pwField)) {
      return {
        isValid: false,
        newErrors: `Password must contain at least one digit`,
      };
    }

    if (!hasPasswordLowerCaseChar(pwField)) {
      return {
        isValid: false,
        newErrors: `Password must contain at least one lower case character`,
      };
    }

    if (!hasPasswordUpperCaseChar(pwField)) {
      return {
        isValid: false,
        newErrors: `Password must contain at least one upper case character`,
      };
    }
  } else {
    if (pwField.length === 0) {
      return {
        isValid: false,
        newErrors: `Please enter your password`,
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
        newErrors: "Passwords do not match",
      };
    }
  }

  return { isValid: true, newErrors: "" };
};

export {
  validateUserName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
};
