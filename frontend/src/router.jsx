import { createBrowserRouter, Navigate } from "react-router-dom";
import Administrator from "./views/Administrator";
import AdminLogin from "./views/AdminLogin";
import Contacto from "./views/Contacto";
import ContactoAdmin from "./views/ContactoAdmin";
import DefaultLayout from "./views/DefaultLayout";
import Home from "./views/Home";
import LogosAdmin from "./views/LogosAdmin";
import Nosotros from "./views/Nosotros";
import NosotrosAdmin from "./views/NosotrosAdmin";
import NosotrosInicioAdmin from "./views/NosotrosInicioAdmin";
import Novedades from "./views/Novedades";
import NovedadesAdmin from "./views/NovedadesAdmin";
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
            {
                path: "/nosotros",
                element: <Nosotros />,
            },
            {
                path: "/novedades",
                element: <Novedades />,
            },
            {
                path: "/contacto",
                element: <Contacto />,
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
            {
                path: "/dashboard/novedades",
                element: <NovedadesAdmin />,
            },
            {
                path: "/dashboard/nosotros",
                element: <NosotrosAdmin />,
            },
            {
                path: "/dashboard/contacto",
                element: <ContactoAdmin />,
            },
        ],
    },
]);

export default router;
