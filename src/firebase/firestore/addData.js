import firebase_app from "../config";
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
} from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function addData(colllection, data) {
  let result = false;
  let error = false;

  try {
    result = await addDoc(collection(db, colllection), data);
    result = true;
  } catch (e) {
    error;
  }

  return { result, error };
}
