import { SelectBoxItem } from "@/models/SelectBoxItem";

const genderSelectBoxItems: SelectBoxItem[] = [
  { id: 1, title: "Male" },
  { id: 2, title: "Female" },
  { id: 3, title: "Other" },
];

const exerciseLevelSelectBoxItems: SelectBoxItem[] = [
  { id: 1, title: "No" },
  { id: 2, title: "Sometimes" },
  { id: 3, title: "Often" },
];

export { genderSelectBoxItems, exerciseLevelSelectBoxItems };
