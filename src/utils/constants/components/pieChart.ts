import { SCREEN_SIZE } from "@/utils/constants";

const pieDimensionsObj = {
  SMALL: 350,
  MEDIUM: 400,
  LARGE: 550,
};

const pieInnerRadiusObj = {
  SMALL: 65,
  MEDIUM: 80,
  LARGE: 120,
};

const pieLabelRadiusObj = {
  SMALL: 85,
  MEDIUM: 105,
  LARGE: 160,
};

const pieCornerRadiusObj = {
  SMALL: 15,
  MEDIUM: 15,
  LARGE: 35,
};

const pieDimensions = pieDimensionsObj[SCREEN_SIZE];
const pieInnerRadius = pieInnerRadiusObj[SCREEN_SIZE];
const pieLabelRadius = pieLabelRadiusObj[SCREEN_SIZE];
const pieCornerRadius = pieCornerRadiusObj[SCREEN_SIZE];

export { pieDimensions, pieInnerRadius, pieLabelRadius, pieCornerRadius };
