import firebase_app from "../config";

import { getFirestore, getDocs, collection } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function getAllData(col) {
  let colRef = collection(db, col);
  var documents = [];
  const querySnapshot = await getDocs(colRef);
  querySnapshot.forEach((doc) => {
    documents.push({ id: doc.id, ...doc.data() });
  });

  return documents;
}
