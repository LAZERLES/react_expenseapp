import React from "react";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <Outlet />
    </div>
  );
};

export default PublicLayout;
