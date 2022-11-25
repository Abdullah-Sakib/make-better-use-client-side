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
      {
        path: 'categories/:name',
        element: <PrivetRoute><CategoriesPage></CategoriesPage></PrivetRoute>,
        loader: ({params}) => fetch(`http://localhost:5000/products?name=${params.name}`)
      },
    ]
  },
  {
    path: '/dashboard',
    element: <DashboardLayout></DashboardLayout>,
    children: [
      {
        path: '/dashboard',
        element: <MyOrders></MyOrders>
      },
      {
        path: '/dashboard/myproducts',
        element: <MyProducts></MyProducts>
      },
      {
        path: '/dashboard/addproduct',
        element: <AddProducts></AddProducts>
      },
      {
        path: '/dashboard/allsellers',
        element: <AllSellers></AllSellers>
      },
      {
        path: '/dashboard/allbuyers',
        element: <AllBuyers></AllBuyers>
      },
      {
        path: '/dashboard/reporteditems',
        element: <ReportedItems></ReportedItems>
      },
      {
        path: '/dashboard/checkout/:id',
        element: <Checkout></Checkout>,
        loader: ({params}) => fetch(`http://localhost:5000/bookedProducts/${params.id}`)
      },
    ]
  }
])