import { firestore } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export const saveUser = async (user: any) => {
  const userRef = doc(firestore, "users", user.uid);
  await setDoc(userRef, {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  });
};
