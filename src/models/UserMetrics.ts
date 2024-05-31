import { ExerciseLevel } from "@/types/ExerciseLevel";
import { Gender } from "@/types/Gender";

export interface userMetrics {
  age: number;
  exerciseLvl: ExerciseLevel;
  gender: Gender;
  height: number;
  weight: number;
}
