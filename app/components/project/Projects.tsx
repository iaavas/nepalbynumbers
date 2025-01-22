"use client";
import Image from "next/image";
import { Card, Button, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { deleteDoc, doc } from "firebase/firestore";

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
      <div className="bg-white">
        <Header t={"Your Projects Here"} />
        {loading ? (
          <div className="flex items-center justify-center p-4">
            <Loader />
          </div>
        ) : error ? (
          <div className="flex flex-col gap-4 justify-center items-center p-4">
            <p className="text-red-600">{error}</p>
          </div>
        ) : projects.length > 0 ? (
          <div className="grid md:grid-cols-4 grid-cols-1 p-3 m-4 gap-5">
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
          <div className="flex flex-col gap-4 p-4  justify-center items-center">
            <Image
              src={"/error.webp"}
              alt="error"
              height={100}
              width={100}
              className="animate-bounce"
            />
            <h1 className="font-onest font-semibold text-2xl text-center mx-auto italic text-stone-900 tracking-wide">
              <span className="text-blue-800 ">No projects found.</span> Time to
              roll up those sleeves and invent something fabulous! 🛠️💡
            </h1>
          </div>
        )}
      </div>
    </>
  );
};

export default Projects;
