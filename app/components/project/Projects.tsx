"use client";
import Image from "next/image";
import { Card, Button, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { deleteDoc, doc } from "firebase/firestore";
import Link from "next/link";
import Navbar from "../ui/Navbar";
import Header from "../ui/Header";
import useProjects from "../../hooks/useProjects";
import { db } from "@/app/libs/firebase/config";

const Projects = () => {
  const { projects, loading, error, fetchProjects } = useProjects();
  const router = useRouter();

  const handleDelete = async (projectId: string) => {
    try {
      await deleteDoc(doc(db, "projects", projectId));
      message.success("Project deleted successfully!");
      fetchProjects(); // Re-fetch projects to update the list
    } catch (error) {
      console.error("Error deleting project: ", error);
      message.error("Failed to delete project.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-white">
        <Header t={"Your Projects Here"} />
        {loading ? (
          <p className="p-4">Loading...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-4 p-3 m-4">
            {projects.map((project) => (
              <div key={project!.id} className="relative mb-2">
                <Link href={`/projects/${project.id}`} className="">
                  <Card
                    title={project?.title.toUpperCase()}
                    bordered={true}
                    className="font-sans text-center tracking-wider w-72 h-80 hover:scale-105 transition-all ease-in-out hover:shadow-md relative border border-gray-300"
                  >
                    <div className="aspect-video">
                      <strong className="text-sm">
                        Saved on: {/* @ts-ignore */}
                        {project?.createdAt?.toDate().toLocaleString()}
                      </strong>
                      <Image
                        src={`/home/${project?.map}.png`}
                        alt="map"
                        height={500}
                        width={500}
                      />
                    </div>
                    <Button
                      type="primary"
                      danger
                      icon={<DeleteOutlined />}
                      className="absolute bottom-2 right-8"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(project.id);
                      }}
                    />
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <h1 className="font-onest font-semibold text-2xl text-center mx-auto mt-40">
            No projects found. Please create and save :) 🙏
          </h1>
        )}
      </div>
    </>
  );
};

export default Projects;
