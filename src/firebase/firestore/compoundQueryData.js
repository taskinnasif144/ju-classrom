import firebase_app from "../config";
import {
  getFirestore,
  collection,
  where,
  query,
  getDocs,
  orderBy,
} from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function coumpoundQuerayData(
  col,
  field1,
  value1,
  field2,
  value2
) {
  try {
    const colRef = collection(db, col);

    const q = query(
      colRef,
      where(field1, "==", value1),
      where(field2, "==", value2)
    );

    const querySnapshot = await getDocs(q);

    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    if (documents.length > 0) {
      return documents;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    throw error;
  }
}
