import { createBrowserRouter, Navigate } from "react-router-dom";
import Administrator from "./views/Administrator";
import AdminLogin from "./views/AdminLogin";
import CategoriasAdmin from "./views/CategoriasAdmin";
import Contacto from "./views/Contacto";
import ContactoAdmin from "./views/ContactoAdmin";
import DefaultLayout from "./views/DefaultLayout";
import GeneralView from "./views/GeneralView";
import GruposDeProductos from "./views/GruposDeProductos";
import Home from "./views/Home";
import LogosAdmin from "./views/LogosAdmin";
import MultipleView from "./views/MultipleView";
import Nosotros from "./views/Nosotros";
import NosotrosAdmin from "./views/NosotrosAdmin";
import NosotrosInicioAdmin from "./views/NosotrosInicioAdmin";
import Novedades from "./views/Novedades";
import NovedadesAdmin from "./views/NovedadesAdmin";
import Productos from "./views/Productos";
import ProductosAdmin from "./views/ProductosAdmin";
import SliderAdmin from "./views/SliderAdmin";
import SubirProductos from "./views/SubirProductos";

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
            {
                path: "/productos",
                element: <Productos />,
            },
            {
                path: "/productos/:id",
                element: <GeneralView />,
            },
            {
                path: "/productos/:id/:id",
                element: <MultipleView />,
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
            {
                path: "/dashboard/subir-productos",
                element: <SubirProductos />,
            },
            {
                path: "/dashboard/categorias",
                element: <CategoriasAdmin />,
            },
            {
                path: "/dashboard/grupo-de-productos",
                element: <GruposDeProductos />,
            },
            {
                path: "/dashboard/productos",
                element: <ProductosAdmin />,
            },
        ],
    },
]);

export default router;
