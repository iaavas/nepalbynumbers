"use client";
import Image from "next/image";
import { Card } from "antd";

import useProjects from "../../hooks/useProjects";
import { useRouter } from "next/navigation";
import { Router } from "lucide-react";
import Link from "next/link";
import Navbar from "../ui/Navbar";
import Header from "../ui/Header";

const Projects = () => {
  const { projects, loading, error } = useProjects();
  const router = useRouter();

  return (
    <>
      <Navbar />
      <div className="bg-white p-4">
        <Header t={"Your Projects Here"} />
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-4 p-3 m-4">
            {projects.map((project) => (
              <Link
                key={project!.id}
                className="mb-2"
                href={`/projects/${project.id}`}
              >
                <Card
                  title={project?.title.toUpperCase()}
                  bordered={true}
                  className="font-sans text-center tracking-wider w-64 h-80"
                >
                  <div className="aspect-video	">
                    <Image
                      src={`/home/${project?.map}.png`}
                      alt="map"
                      height={500}
                      width={500}
                    />

                    <p className="text-sm">
                      {/* @ts-ignore */}
                      Saved on: {project?.createdAt?.toDate().toLocaleString()}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <p>No projects found.</p>
        )}
      </div>
    </>
  );
};

export default Projects;
