
import React from "react";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoading } = useAuth();

  if (isLoading) {
    // Show loading state while checking authentication
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Allow access to all users, even if not authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
