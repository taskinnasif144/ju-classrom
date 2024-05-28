import firebase_app from "../config";
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
} from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function setData(col, id, data) {
  let result = null;
  let error = null;
  await setDoc(doc(db, col, id), data, { merge: true })
    .then(() => {
      result = true;
      error = false;
    })
    .catch(() => {
      result = false;
      error = true;
    });

  return { result, error };
}
