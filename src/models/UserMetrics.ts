import { ExerciseLevel } from "@/enums/settings/ExerciseLevel";
import { Gender } from "@/enums/settings/Gender";

export interface UserMetrics {
  age: number | null;
  exerciseLvl: ExerciseLevel | null;
  gender: Gender | null;
  height: number | null;
  weight: number | null;
  dailyHydrationGoal: number;
}
