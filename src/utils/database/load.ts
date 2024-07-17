import {
  doc,
  getDoc,
  DocumentData,
  DocumentSnapshot,
} from "firebase/firestore";

import { firestore } from "../../../firebase";

import { UserData } from "@/models/UserData";

/**
 * Loads user data from Firestore for a given user ID.
 *
 * This function fetches the user's document from the Firestore database
 * using the provided user ID. If the document exists, it returns the user data.
 * If the document does not exist or an error occurs, it logs an appropriate
 * message and returns null.
 *
 * @param {*} userId - Firestore ID of currently logged in user
 */
const loadUserData = async (userId: string): Promise<DocumentData | null> => {
  const userDocRef = doc(firestore, "users", userId);
  try {
    const docSnap: DocumentSnapshot<DocumentData> = await getDoc(userDocRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
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
