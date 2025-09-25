import { createBrowserRouter } from "react-router";
import  {MainLayout}  from "../layouts/MainLayout";
import Home from "../pages/Home.jsx"
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import NotFound from "../pages/NotFound.jsx";
import AddActivity from "../pages/AddActivity.jsx";

const router = createBrowserRouter([
    {
        path:"/",
        element:<MainLayout/>,
        children:[
            {
                path:"/",
                element:<Home/>,
            },
            {
                path:"/login",
                element:<Login/>
            },
            {
                path:"/register",
                element:<Register/>
            },
            {
                path:"/add-activity",
                element:<AddActivity/>
            }
        ]
    },
    {
        path:"*",
        element:<NotFound/>
    }
])

export default router;