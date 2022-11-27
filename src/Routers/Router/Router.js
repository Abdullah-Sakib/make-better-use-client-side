import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layouts/DashboardLayout/DashboardLayout";
import Main from "../../Layouts/Main";
import AllBuyers from "../../Pages/Dashboard/Admin/AllBuyers/AllBuyers";
import AllSellers from "../../Pages/Dashboard/Admin/AllSellers/AllSellers";
import ReportedItems from "../../Pages/Dashboard/Admin/ReportedItems/ReportedItems";
import AddProducts from "../../Pages/Dashboard/Seller/AddProducts/AddProducts";
import MyProducts from "../../Pages/Dashboard/Seller/MyProducts/MyProducts";
import MyOrders from "../../Pages/Dashboard/User/MyOrders/MyOrders";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import CategoriesPage from '../../Pages/CategoriesPage/CategoriesPage'
import PrivetRoute from "../PrivetRoute/PrivetRoute";
import Checkout from "../../Pages/Checkout/Checkout";
import AdminRoute from "../AdminRoute/AdminRoute";
import SellerRoute from "../SellerRoute/SellerRoute";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import Blogs from "../../Pages/Blogs/Blogs";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'blogs',
        element: <Blogs></Blogs>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'register',
        element: <Register></Register>
      },
      {
        path: 'categories/:name',
        element: <PrivetRoute><CategoriesPage></CategoriesPage></PrivetRoute>,
        loader: ({params}) => fetch(`https://assignment-12-server-side-gamma.vercel.app/products?name=${params.name}`, {
          headers: {
            authorization: `bearer ${localStorage.getItem('accessToken')}`
          }
        })
      },
    ]
  },
  {
    path: '/dashboard',
    element: <DashboardLayout></DashboardLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/dashboard',
        element: <PrivetRoute><MyOrders></MyOrders></PrivetRoute>
      },
      {
        path: '/dashboard/myproducts',
        element: <SellerRoute><MyProducts></MyProducts></SellerRoute>
      },
      {
        path: '/dashboard/addproduct',
        element: <SellerRoute><AddProducts></AddProducts></SellerRoute>
      },
      {
        path: '/dashboard/allsellers',
        element: <AdminRoute><AllSellers></AllSellers></AdminRoute>
      },
      {
        path: '/dashboard/allbuyers',
        element: <AdminRoute><AllBuyers></AllBuyers></AdminRoute>
      },
      {
        path: '/dashboard/reporteditems',
        element: <AdminRoute><ReportedItems></ReportedItems></AdminRoute>
      },
      {
        path: '/dashboard/checkout/:id',
        element: <Checkout></Checkout>,
        loader: ({params}) => fetch(`https://assignment-12-server-side-gamma.vercel.app/bookedProducts/${params.id}`, {
          headers: {
            authorization: `bearer ${localStorage.getItem('accessToken')}`
          }
        })
      },
    ]
  }
])