"use client";
// src/components/Projects.tsx
import React, { useEffect, useState } from "react";
import { db } from "../../libs/firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useSession } from "@/app/context/SessionContext";

interface ProjectType {
  id: string;
  title: string;
  type: string;
  createdAt: Date;
}

const Projects = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const user = useSession();
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);

      if (user) {
        try {
          const q = query(collection(db, "projects"), where("uid", "==", user));
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
  }, [user]);

  return (
    <div className="bg-white rounded-lg py-4 my-8">
      <h3 className="text-lg mb-2 font-sans">Your Saved Projects</h3>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : projects.length > 0 ? (
        <ul>
          {projects.map((project) => (
            <li key={project!.id} className="mb-2">
              <h4 className="text-md font-bold">{project?.title}</h4>
              <p className="text-sm">{project?.type}</p>
              <p className="text-sm">
                {/* @ts-ignore */}
                Saved on: {project?.createdAt?.toDate().toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No projects found.</p>
      )}
    </div>
  );
};

export default Projects;
