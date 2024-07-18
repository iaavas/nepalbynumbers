import { ComponentType } from "react";
import { AuthContextProvider } from "@/app/context/AuthContext";

export default function withAuth<P extends object>(
  WrappedComponent: ComponentType<P>
) {
  return function WithAuth(props: P) {
    return (
      <AuthContextProvider>
        <WrappedComponent {...props} />
      </AuthContextProvider>
    );
  };
}
