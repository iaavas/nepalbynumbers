import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { firebaseAuth } from "@/app/libs/firebase/config";
const useUser = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  return currentUser;
};

export default useUser;
