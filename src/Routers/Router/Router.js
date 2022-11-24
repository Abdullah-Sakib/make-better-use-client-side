import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layouts/DashboardLayout/DashboardLayout";
import Main from "../../Layouts/Main";
import AddProducts from "../../Pages/Dashboard/Seller/AddProducts/AddProducts";
import MyProducts from "../../Pages/Dashboard/Seller/MyProducts/MyProducts";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'register',
        element: <Register></Register>
      },
    ]
  },
  {
    path: '/dashboard',
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: '/dashboard',
        element: <MyProducts></MyProducts>
      },
      {
        path: '/dashboard/addproduct',
        element: <AddProducts></AddProducts>
      }
    ]
  }
])