// src/components/SaveProjectButton.jsx
import React, { useState } from "react";
import { useValues } from "../context/ValueContext";
import { usePostfix } from "../context/PostfixContext";
import { useColor } from "../context/ColorsContext";
import { useReference } from "../context/ReferenceContext";
import { db } from "../libs/firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

function SaveProjectButton({ map }: { map: string }) {
  const { title, type, getAllEntityValues } = useValues();
  const { postfix, prefix } = usePostfix();
  const { theme } = useColor();
  const { createdBy, source, statsTitle, statsValue } = useReference();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [pName, setPName] = useState("");

  const save = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const auth = getAuth();
    const user = auth.currentUser;

    try {
      if (!pName) {
        setError("Please add project name");
        return;
      }
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
        pName, // Adding user ID
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
    <div className="bg-white rounded-lg p-6  w-full">
      <input
        type="text"
        value={pName}
        onChange={(e) => setPName(e.target.value)}
        className="w-full p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter project name"
      />
      <button
        onClick={save}
        className={`w-full p-4 rounded-lg text-white transition-all text-xl ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
        disabled={loading}
      >
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
