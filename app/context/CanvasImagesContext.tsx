"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

export type CanvasImage = {
  id: string;
  name: string;
  src: string;
  width: number;
  rotation: number;
  x: number;
  y: number;
};

type CanvasImagesContextType = {
  images: CanvasImage[];
  addImages: (files: FileList | File[]) => Promise<void>;
  updateImage: (id: string, updates: Partial<CanvasImage>) => void;
  removeImage: (id: string) => void;
};

const CanvasImagesContext = createContext<CanvasImagesContextType | null>(null);

const readFileAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

export const CanvasImagesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [images, setImages] = useState<CanvasImage[]>([]);

  const addImages = async (filesInput: FileList | File[]) => {
    const files = Array.from(filesInput);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    if (!imageFiles.length) return;

    const loadedImages = await Promise.all(
      imageFiles.map(async (file, index) => {
        const src = await readFileAsDataUrl(file);
        return {
          id: `${Date.now()}-${index}-${file.name}`,
          name: file.name,
          src,
          width: 220,
          rotation: 0,
          x: 120 + index * 24,
          y: 120 + index * 24,
        } as CanvasImage;
      })
    );

    setImages((prev) => [...prev, ...loadedImages]);
  };

  const updateImage = (id: string, updates: Partial<CanvasImage>) => {
    setImages((prev) =>
      prev.map((image) => (image.id === id ? { ...image, ...updates } : image))
    );
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((image) => image.id !== id));
  };

  const value = useMemo(
    () => ({
      images,
      addImages,
      updateImage,
      removeImage,
    }),
    [images]
  );

  return (
    <CanvasImagesContext.Provider value={value}>
      {children}
    </CanvasImagesContext.Provider>
  );
};

export const useCanvasImages = () => {
  const context = useContext(CanvasImagesContext);
  if (!context) {
    throw new Error(
      "useCanvasImages must be used within a CanvasImagesProvider"
    );
  }
  return context;
};
