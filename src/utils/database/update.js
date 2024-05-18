import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../../../firebase";

const updateUserData = async (userId, data) => {
  const userDocRef = doc(firestore, "users", userId);
  try {
    await setDoc(userDocRef, data, { merge: true }); // Merges data with existing document
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
