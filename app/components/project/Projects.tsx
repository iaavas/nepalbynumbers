"use client";
import Image from "next/image";
import { Card, Button, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { deleteDoc, doc } from "firebase/firestore";

import Navbar from "../ui/Navbar";
import Header from "../ui/Header";
import useProjects from "../../hooks/useProjects";
import { db } from "@/app/libs/firebase/config";
import Loader from "../ui/Loader";

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
          <div className="flex items-center justify-center p-4">
            <Loader />
          </div>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-4 p-3 m-4 gap-5">
            {projects.map((project) => (
              <div key={project!.id} className="relative mb-2">
                <Card
                  title={project?.title.toUpperCase()}
                  bordered={true}
                  className="font-sans  tracking-wider   border border-gray-300 text-center"
                >
                  <div className="aspect-video">
                    <Image
                      src={`/home/${project?.map}.png`}
                      alt="map"
                      height={500}
                      width={500}
                    />
                  </div>
                  <p className="text-sm mb-8 border-b py-4 border-gray-400">
                    Saved on: {/* @ts-ignore */}
                    {project?.createdAt?.toDate().toLocaleString()}
                  </p>

                  <div className="flex items-center justify-between ">
                    <Button
                      icon={<EditOutlined />}
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(`/projects/${project.id}`);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      icon={<DeleteOutlined />}
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(project.id);
                      }}
                      danger={true}
                    >
                      Delete
                    </Button>
                  </div>
                </Card>
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
