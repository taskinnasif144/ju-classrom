import firebase_app from "../config";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

const storagePath = "gs://ju-cls.appspot.com";

const storage = getStorage(firebase_app, storagePath);

export default async function uploadFileToFirebase(file) {
  let url;
  try {
    const storageRef = ref(storage, file.name);
    const uploadTask = await uploadBytes(storageRef, file);
    url = await getDownloadURL(uploadTask.ref);
  } catch (error) {
    url = false;
    console.error(error);
  }
  return url;
}
