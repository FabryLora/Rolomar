import { createBrowserRouter, Navigate } from "react-router-dom";
import Administrator from "./views/Administrator";
import AdminLogin from "./views/AdminLogin";
import DefaultLayout from "./views/DefaultLayout";
import Home from "./views/Home";
import LogosAdmin from "./views/LogosAdmin";
import NosotrosInicioAdmin from "./views/NosotrosInicioAdmin";
import SliderAdmin from "./views/SliderAdmin";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to={"/inicio"} />,
            },
            {
                path: "/inicio",
                element: <Home />,
            },
        ],
    },
    {
        path: "/adm",
        element: <AdminLogin />,
    },
    {
        path: "/dashboard",
        element: <Administrator />,
        children: [
            {
                path: "/dashboard/slider",
                element: <SliderAdmin />,
            },
            {
                path: "/dashboard/logos",
                element: <LogosAdmin />,
            },
            {
                path: "/dashboard/nosotros-inicio",
                element: <NosotrosInicioAdmin />,
            },
        ],
    },
]);

export default router;
