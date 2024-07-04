// src/hooks/useProjects.ts
import { useEffect, useState } from "react";
import { db } from "../libs/firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export interface ProjectType {
  id: string;
  title: string;
  type: string;
  createdAt: Date;
  map: string;
  postfix: string;
  prefix: string;
  theme: string;
  data: [];
  createdBy: string;
  source: string;
  statsTitle: string;
  statsValue: string;
  uid: string;
}

const useProjects = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);

      const auth = getAuth();
      const user = auth.currentUser;
      console.log(user);

      if (user) {
        try {
          const q = query(
            collection(db, "projects"),
            where("uid", "==", user.uid)
          );
          const querySnapshot = await getDocs(q);

          const projectList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setProjects(projectList as ProjectType[]);
        } catch (e) {
          console.error("Error fetching projects: ", e);
          setError("Failed to fetch projects. Please try again.");
        }
      } else {
        setError("No user is logged in.");
      }

      setLoading(false);
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
};

export default useProjects;
