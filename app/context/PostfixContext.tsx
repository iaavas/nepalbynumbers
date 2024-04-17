"use client";

import {
  createContext,
  useContext,
  FC,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

const PostfixContext = createContext<ValueContextType | null>(null);

interface ValueContextType {
  postfix: string;
  prefix: string;
  setPostfix: Dispatch<SetStateAction<string>>;
  setPrefix: Dispatch<SetStateAction<string>>;
}

export const PostfixProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [postfix, setPostfix] = useState<string>("");
  const [prefix, setPrefix] = useState<string>("");

  const contextValue: ValueContextType = {
    postfix,
    prefix,
    setPostfix,
    setPrefix,
  };

  return (
    <PostfixContext.Provider value={contextValue}>
      {children}
    </PostfixContext.Provider>
  );
};

export const usePostfix = () => {
  const context = useContext(PostfixContext);
  if (!context) {
    throw new Error("usePostfix must be used within a Postfix");
  }
  return context;
};
