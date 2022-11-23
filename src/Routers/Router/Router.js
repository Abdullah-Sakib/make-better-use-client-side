import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layouts/Main";
import Banner from "../../Pages/Home/Banner/Banner";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Banner></Banner>
      }
    ]
  }
])