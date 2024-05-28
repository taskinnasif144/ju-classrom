import firebase_app from "../config";
import { getFirestore, doc, updateDoc, arrayRemove } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function removeStudentId(col, id, data) {
  let result = null;
  let error = null;

  // Use updateDoc with arrayRemove to remove the specific studentId
  await updateDoc(doc(db, col, id), {
    students: arrayRemove(studentId),
  })
    .then(() => {
      result = true;
      error = false;
    })
    .catch((err) => {
      result = false;
      error = err; // Capture the actual error object for better handling
    });

  return { result, error };
}
