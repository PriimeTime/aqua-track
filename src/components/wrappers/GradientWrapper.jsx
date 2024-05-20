import { LinearGradient } from "expo-linear-gradient";
import { color } from "../../utils/constants";

function GradientWrapper({ children, ...props }) {
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
