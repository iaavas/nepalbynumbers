// src/components/SaveProjectButton.jsx
import React, { useState } from "react";
import { useValues } from "../context/ValueContext";
import { usePostfix } from "../context/PostfixContext";
import { useColor } from "../context/ColorsContext";
import { useReference } from "../context/ReferenceContext";
import { db } from "../libs/firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { SaveOutlined } from "@ant-design/icons";
function SaveProjectButton({ map }: { map: string }) {
  const { title, type, getAllEntityValues } = useValues();
  const { postfix, prefix } = usePostfix();
  const { theme } = useColor();
  const { createdBy, source, statsTitle, statsValue } = useReference();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const save = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const auth = getAuth();
    const user = auth.currentUser;
    console.log(user);

    try {
      const data = {
        title,
        type,
        postfix,
        prefix,
        theme,
        data: getAllEntityValues(map),
        createdBy,
        source,
        statsTitle,
        statsValue,
        map: map,
        uid: user?.uid,
        createdAt: serverTimestamp(),
      };
      const docRef = await addDoc(collection(db, "projects"), data);
      console.log("Document written with ID: ", docRef.id);
      setSuccess(true);
    } catch (e) {
      console.error("Error adding document: ", e);
      setError("Failed to save project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg py-2 my-8">
      <h3 className=" text-lg mb-2 font-sans">Save your Map</h3>
      <button
        onClick={save}
        className={` p-1.5 rounded-lg  transition-all text-sm bg-gray-50/10 text-gray-700 flex  gap-x-2 items-center border-gray-300 border hover:border-blue-500 hover:text-blue-500 shadow-sm`}
        disabled={loading}
      >
        <SaveOutlined />
        {loading ? "Saving..." : "Save Project"}
      </button>
      {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
      {success && (
        <p className="mt-4 text-green-600 text-center">
          Project saved successfully!
        </p>
      )}
    </div>
  );
}

export default SaveProjectButton;
