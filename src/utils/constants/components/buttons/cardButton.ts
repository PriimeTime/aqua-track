import { ms } from "react-native-size-matters";

import { ScreenSize } from "@/enums/maps/ScreenSize";

import { SCREEN_SIZE } from "@/utils/constants";

const cardBorderRadius = SCREEN_SIZE === ScreenSize.LARGE ? ms(15) : ms(20);

export { cardBorderRadius };
