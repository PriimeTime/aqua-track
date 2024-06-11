import {
  doc,
  getDoc,
  DocumentData,
  DocumentSnapshot,
} from "firebase/firestore";

import { firestore } from "../../../firebase";

import { UserData } from "@/models/UserData";

const loadUserData = async (userId: string): Promise<DocumentData | null> => {
  const userDocRef = doc(firestore, "users", userId);
  try {
    const docSnap: DocumentSnapshot<DocumentData> = await getDoc(userDocRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log("User data:", data);
      return (data as UserData) || null; // Return data if it exists, otherwise return null
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);
    return null;
  }
};

export { loadUserData };
