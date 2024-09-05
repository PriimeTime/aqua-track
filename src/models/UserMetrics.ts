import { ExerciseLevel } from "@/enums/settings/ExerciseLevel";
import { Gender } from "@/enums/settings/Gender";
import { MeasurementSystem } from "@/enums/settings/MeasurementSystem";

export interface UserMetrics {
  age: number | null;
  exerciseLvl: ExerciseLevel | null;
  measurementSystem: MeasurementSystem | null;
  gender: Gender | null;
  height: number | null;
  weight: number | null;
  dailyHydrationGoal: number;
}
