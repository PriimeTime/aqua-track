import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../firebase";

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

export { loadUserData };
