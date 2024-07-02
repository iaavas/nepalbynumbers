"use client";
import React, { createContext, useContext } from "react";

const SessionContext = createContext<string | null>(null);

export const SessionProvider = ({
  session,
  children,
}: {
  session: string | null;
  children: React.ReactNode;
}) => (
  <SessionContext.Provider value={session}>{children}</SessionContext.Provider>
);

export const useSession = () => useContext(SessionContext);
