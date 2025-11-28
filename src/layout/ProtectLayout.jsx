import React from "react";
import { Outlet, Link } from "react-router-dom";
import useAuthStore from "../store/authStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";
import { ArrowLeftRight } from "lucide-react";
import { Plus } from "lucide-react";
import { ChartPie } from "lucide-react";

const ProtectLayout = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      toast.success("Logged out successfully");
      navigate("/login");
    }
  };
  return (
    <div className="drawer overflow-hidden">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 font-bold text-3xl">
            Expense Tracker APP
          </div>
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal">
              {/* Navbar menu content here */}
              <li>
                <Link to="/dashboard" className="text-base">
                  <LayoutDashboard />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/transactions" className="text-base">
                  <ArrowLeftRight />
                  Transactions
                </Link>
              </li>
              <li>
                <Link to="/add" className="text-base">
                  <Plus />
                  Add Transaction
                </Link>
              </li>
              <li>
                <button
                  className="btn btn-error text-base btn-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
        {/* Page content here */}
        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <li>
            <Link to="/dashboard" className="text-base">
              <LayoutDashboard />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/transactions" className="text-base">
              <ArrowLeftRight />
              Transactions
            </Link>
          </li>
          <li>
            <Link to="/add" className="text-base">
              <Plus />
              Add Transaction
            </Link>
          </li>
          <li>
            <button
              className="btn btn-error text-base btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProtectLayout;
