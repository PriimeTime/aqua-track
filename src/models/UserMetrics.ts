import { ExerciseLevel } from "@/enums/ExerciseLevel";
import { Gender } from "@/enums/Gender";

export interface UserMetrics {
  age: number | null;
  exerciseLvl: ExerciseLevel | null;
  gender: Gender | null;
  height: number | null;
  weight: number | null;
}
