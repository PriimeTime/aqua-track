import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../../../firebase";
import { UserData } from "@/models/UserData";

const updateUserData = async (userId: string, userData: UserData) => {
  const userDocRef = doc(firestore, "users", userId);
  try {
    await setDoc(userDocRef, userData, { merge: true }); // Merges data with existing document
    console.log("--------------");
    console.log("Document successfully updated!");
    console.log("--------------");
  } catch (error) {
    console.log("--------------");
    console.error("Error updating document:", error);
    console.log("--------------");
  }
};

export { updateUserData };
