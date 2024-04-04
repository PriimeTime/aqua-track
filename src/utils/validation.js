const isEmailValid = (email) => {
  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const hasPasswordDigit = (password) => {
  return /[0-9]/.test(password);
};

const hasPasswordUpperCaseChar = (password) => {
  return /[A-Z]/.test(password);
};

const hasPasswordLowerCaseChar = (password) => {
  return /[a-z]/.test(password);
};

export const validateEmail = (emailField) => {
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

export const validatePassword = (pwField) => {
  const pwMinLen = 6;
  const pwMaxLen = 30;

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

  return { isValid: true, newErrors: "" };
};

export const validateConfirmPassword = (pwField, confPwField) => {
  if (confPwField !== pwField) {
    return {
      isValid: false,
      newErrors: "Passwords do not match",
    };
  }

  return { isValid: true, newErrors: "" };
};