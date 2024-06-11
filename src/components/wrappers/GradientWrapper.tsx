import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";
import React from "react";

import { color } from "@/utils/constants";

/**
 * Colors property of the
 * LinearGradientProps component
 * must be omitted so that the colors
 * cannot be set over props spread
 */
function GradientWrapper({
  children,
  ...props
}: Omit<LinearGradientProps, "colors">) {
  return (
    <LinearGradient
      colors={[
        color.APP_PRIMARY_BACKGROUND_FIRST_GRADIENT,
        color.APP_PRIMARY_BACKGROUND_SECOND_GRADIENT,
      ]}
      {...props}
    >
      {children}
    </LinearGradient>
  );
}

export { GradientWrapper };
