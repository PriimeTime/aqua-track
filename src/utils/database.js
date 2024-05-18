import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../../firebase";

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

const loadUserData = async (userId) => {
  const userDocRef = doc(firestore, "users", userId);
  try {
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      console.log("User data:", docSnap.data());
      return docSnap.data(); // Returns user data as an object
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error getting document:", error);
  }
};

export { updateUserData, loadUserData };
