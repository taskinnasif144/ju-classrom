import firebase_app from "../config";
import {
  getFirestore,
  collection,
  where,
  query,
  getDocs,
} from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function getDocumentByField(col, field, value) {
  try {
    const colRef = collection(db, col);
    const q = query(colRef, where(field, "==", value));

    const querySnapshot = await getDocs(q);
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (documents.length > 0) {
      return documents[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    throw error;
  }
}
