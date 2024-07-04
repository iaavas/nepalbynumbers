"use client";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface sessionType {
  session: string | null;
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
}

const SessionContext = createContext<sessionType | null>(null);

export const SessionProvider = ({
  session,
  children,
}: {
  session: string | null;
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<any>(null); // Initialize user as null or any appropriate initial value
  const sessionValue: sessionType = { session, user, setUser };
  return (
    <SessionContext.Provider value={sessionValue}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === null) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
