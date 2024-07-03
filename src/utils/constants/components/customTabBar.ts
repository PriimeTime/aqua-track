import { SCREEN_SIZE } from "@/utils/constants";

const customTabBarFontSizeObj = {
  SMALL: 16,
  MEDIUM: 20,
  LARGE: 28,
};

const customTabBarRadiusObj = {
  SMALL: 26,
  MEDIUM: 36,
  LARGE: 72,
};

const customTabBarPaddingObj = {
  SMALL: "2%",
  MEDIUM: "2.5%",
  LARGE: "1.5%",
};

const customTabBarFontSize = customTabBarFontSizeObj[SCREEN_SIZE];
const customTabBarPadding = customTabBarPaddingObj[SCREEN_SIZE];
const customTabBarRadius = customTabBarRadiusObj[SCREEN_SIZE];

export { customTabBarFontSize, customTabBarPadding, customTabBarRadius };
