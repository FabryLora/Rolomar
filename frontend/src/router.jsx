import { createBrowserRouter, Navigate } from "react-router-dom";
import Administradores from "./views/Administradores";
import Administrator from "./views/Administrator";
import AdminLogin from "./views/AdminLogin";
import Carrito from "./views/Carrito";
import CategoriasAdmin from "./views/CategoriasAdmin";
import ClientesAdmin from "./views/ClientesAdmin";
import Contacto from "./views/Contacto";
import ContactoAdmin from "./views/ContactoAdmin";
import Contenido from "./views/Contenido";
import DefaultLayout from "./views/DefaultLayout";
import GeneralView from "./views/GeneralView";
import GruposDeProductos from "./views/GruposDeProductos";
import Home from "./views/Home";
import InformacionCarrito from "./views/InformacionCarrito";
import ListaDePrecios from "./views/ListaDePrecios";
import ListaDePreciosAdmin from "./views/ListaDePreciosAdmin";
import Login from "./views/Login";
import LogosAdmin from "./views/LogosAdmin";
import MarcasAdmin from "./views/MarcasAdmin";
import Metadatos from "./views/Metadatos";
import Mispedidos from "./views/MisPedidos";
import MultipleView from "./views/MultipleView";
import Nosotros from "./views/Nosotros";
import NosotrosAdmin from "./views/NosotrosAdmin";
import NosotrosInicioAdmin from "./views/NosotrosInicioAdmin";
import Novedades from "./views/Novedades";
import NovedadesAdmin from "./views/NovedadesAdmin";
import NovedadUnica from "./views/NovedadUnica";
import PedidosAdmin from "./views/PedidosAdmin";
import PrivateProducts from "./views/PrivateProducts";
import PrivateZone from "./views/PrivateZone";
import Productos from "./views/Productos";
import ProductosAdmin from "./views/ProductosAdmin";
import RealProducts from "./views/RealProducts";
import Signup from "./views/Signup";
import SliderAdmin from "./views/SliderAdmin";
import SubirProductos from "./views/SubirProductos";
import SubirUsuarios from "./views/SubirUsuarios";

const router = createBrowserRouter([
    {
        path: "/registro",
        element: <Signup />,
    },
    {
        path: "/iniciar-sesion",
        element: <Login />,
    },
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
                path: "/novedades/:id",
                element: <NovedadUnica />,
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
                path: "/dashboard/subir-usuarios",
                element: <SubirUsuarios />,
            },
            {
                path: "/dashboard/categorias",
                element: <CategoriasAdmin />,
            },
            {
                path: "/dashboard/productos",
                element: <GruposDeProductos />,
            },

            {
                path: "/dashboard/clientes",
                element: <ClientesAdmin />,
            },
            {
                path: "/dashboard/administradores",
                element: <Administradores />,
            },
            {
                path: "/dashboard/lista-de-precios",
                element: <ListaDePreciosAdmin />,
            },
            {
                path: "/dashboard/pedidos-privada",
                element: <PedidosAdmin />,
            },
            {
                path: "/dashboard/sub-productos",
                element: <RealProducts />,
            },
            {
                path: "/dashboard/metadatos",
                element: <Metadatos />,
            },
            {
                path: "/dashboard/marcas",
                element: <MarcasAdmin />,
            },
            {
                path: "/dashboard/informacion",
                element: <InformacionCarrito />,
            },
            {
                path: "/dashboard/contenido",
                element: <Contenido />,
            },
        ],
    },
    {
        path: "/privado",
        element: <PrivateZone />,
        children: [
            {
                path: "/privado",
                element: <Navigate to={"/privado/productos"} />,
            },
            {
                path: "/privado/productos",
                element: <PrivateProducts />,
            },
            {
                path: "/privado/carrito",
                element: <Carrito />,
            },
            {
                path: "/privado/mis-pedidos",
                element: <Mispedidos />,
            },
            {
                path: "/privado/lista-de-precios",
                element: <ListaDePrecios />,
            },
        ],
    },
]);

export default router;
