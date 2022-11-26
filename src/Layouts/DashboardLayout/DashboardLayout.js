import React from "react";
import { Link, Outlet } from "react-router-dom";
import useUserRole from "../../CustomHooks/useUserRole/useUserRole";
import Navbar from "../../Pages/Shared/Navbar/Navbar";
import "./DashboardLayout.css";

const DashboardLayout = () => {
  const {role} = useUserRole();

  return (
    <div>
      <Navbar></Navbar>
      <div className="drawer drawer-mobile  ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content p-5 bg-slate-200" id="dashboard">
          {/* <!-- Page content here --> */}
          <Outlet></Outlet>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            {/* <!-- Sidebar content here --> */}
            <li>
              <Link className="font-semibold" to="/dashboard">
                My Orders
              </Link>
            </li>
            {role === "seller" && (
              <li>
                <Link className="font-semibold" to="/dashboard/myproducts">
                  My Products
                </Link>
              </li>
            )}
            {role === "seller" && (
              <li>
                <Link className="font-semibold" to="/dashboard/addproduct">
                  Add A Product
                </Link>
              </li>
            )}
            {role === "admin" && (
              <li>
                <Link className="font-semibold" to="/dashboard/allsellers">
                  All Sellers
                </Link>
              </li>
            )}
            {role === "admin" && (
              <li>
                <Link className="font-semibold" to="/dashboard/allbuyers">
                  All Buyers
                </Link>
              </li>
            )}
            {role === "admin" && (
              <li>
                <Link className="font-semibold" to="/dashboard/reporteditems">
                  Reported Items
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
