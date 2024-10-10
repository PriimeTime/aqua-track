import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { MeasurementSystem } from "@/enums/settings/MeasurementSystem";

import { type UserDataState } from "@/types/store/UserDataState";

import {
  AVOIRDUPOIS_OUNCE_FACTOR,
  AVOIRDUPOIS_POUND_FACTOR,
} from "@/utils/constants";
import { formatNumber } from "@/utils/helpers";

function useDisplayUnits() {
  const { t } = useTranslation();

  const measurementSystem = useSelector(
    (state: UserDataState) => state.userData.userMetrics.measurementSystem
  );

  const displayVolume = (volume: number) => {
    if (measurementSystem === MeasurementSystem.Imperial) {
      return volume / AVOIRDUPOIS_OUNCE_FACTOR;
    } else {
      return volume;
    }
  };

  const displayRoundedVolume = (volume: number) => {
    return formatNumber(displayVolume(volume));
  };

  const displayVolumeUnit = (): string => {
    return measurementSystem === MeasurementSystem.Imperial
      ? "unit.oz"
      : "unit.ml";
  };

  const displayVolumeWithUnit = (volume: number): string => {
    return `${displayRoundedVolume(volume)} ${t(displayVolumeUnit())}`;
  };

  const displayWeight = (weight: number) => {
    if (measurementSystem === MeasurementSystem.Imperial) {
      return weight / AVOIRDUPOIS_POUND_FACTOR;
    } else {
      return weight;
    }
  };

  const displayRoundedWeight = (weight: number) => {
    return formatNumber(displayWeight(weight));
  };

  const displayWeightUnit = (): string => {
    return measurementSystem === MeasurementSystem.Imperial
      ? "unit.lbs"
      : "unit.kg";
  };

  const displayWeightWithUnit = (weight: number): string => {
    return `${displayRoundedWeight(weight)} ${t(displayWeightUnit())}`;
  };

  return {
    displayVolume,
    displayRoundedVolume,
    displayVolumeUnit,
    displayVolumeWithUnit,
    displayWeight,
    displayRoundedWeight,
    displayWeightUnit,
    displayWeightWithUnit,
  };
}

export { useDisplayUnits };
