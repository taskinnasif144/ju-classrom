import firebase_app from "../config";
import { doc, deleteDoc, getFirestore } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function deleteData(col, id) {
  let docRef = doc(db, col, id);

  let result = null;
  let error = null;

  try {
    let docSnap = await deleteDoc(docRef);
    result = true;
  } catch (e) {
    error = e;
  }

  return result;
}
