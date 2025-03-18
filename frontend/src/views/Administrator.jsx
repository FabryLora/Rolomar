import {
    faBars,
    faBoxArchive,
    faBuilding,
    faChevronRight,
    faEnvelope,
    faGear,
    faHouse,
    faLock,
    faNewspaper,
    faShield,
    faUser,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import rolomarLogo from "../assets/logos/calite.png";
import { useStateContext } from "../contexts/ContextProvider";

export default function Administrator() {
    const { adminToken, setAdminToken, adminInfo, logos } = useStateContext();
    const [sidebar, setSidebar] = useState(true);

    const MotionFontAwesomeIcon = motion.create(FontAwesomeIcon);
    const MotionLink = motion.create(Link);

    const location = useLocation();

    const cleanPathname = location.pathname
        .replace(/^\/+/, "")
        .replace(/-/g, " ")
        .split("/");

    cleanPathname.shift();

    const finalPath = cleanPathname.join("/");

    const [dropdowns, setDropdowns] = useState([
        {
            id: "inicio",
            open: false,
            title: "Inicio",
            icon: faHouse,
            href: "#",
            subHref: [
                { title: "Slider", href: "/dashboard/slider" },
                { title: "Contenido", href: "/dashboard/contenido" },
            ],
        },

        {
            id: "nosotros",
            open: false,
            title: "Nosotros",
            icon: faBuilding,
            href: "#",
            subHref: [{ title: "Nosotros", href: "/dashboard/nosotros" }],
        },
        {
            id: "catalogo",
            open: false,
            title: "Productos",
            icon: faBoxArchive,
            href: "#",
            subHref: [
                { title: "Categorias", href: "/dashboard/categorias" },
                {
                    title: "Productos",
                    href: "/dashboard/grupo-de-productos",
                },
                { title: "Sub Productos", href: "/dashboard/productos" },
            ],
        },
        {
            id: "novedades",
            open: false,
            title: "Novedades",
            icon: faNewspaper,
            href: "#",
            subHref: [
                { title: "Tarjetas Novedades", href: "/dashboard/novedades" },
            ],
        },
        {
            id: "contacto",
            open: false,
            title: "Contacto",
            icon: faEnvelope,
            href: "#",
            subHref: [{ title: "Contacto", href: "/dashboard/contacto" }],
        },
        {
            id: "clientes",
            open: false,
            title: "Clientes",
            icon: faUsers,
            href: "#",
            subHref: [{ title: "Clientes", href: "/dashboard/clientes" }],
        },
        {
            id: "administradores",
            open: false,
            title: "Administradores",
            icon: faShield,
            href: "#",
            subHref: [
                {
                    title: "Administradores",
                    href: "/dashboard/administradores",
                },
            ],
        },
        {
            id: "metadatos",
            open: false,
            title: "Metadatos",
            icon: faGear,
            href: "#",
            subHref: [{ title: "Metadatos", href: "/dashboard/metadatos" }],
        },
        {
            id: "zonaprivada",
            open: false,
            title: "Zona Privada",
            icon: faLock,
            href: "#",
            subHref: [
                { title: "Pedidos", href: "/dashboard/pedidos-privada" },
                {
                    title: "Lista de Precios",
                    href: "/dashboard/lista-de-precios",
                },
                {
                    title: "Informacion carrito",
                    href: "/dashboard/informacion",
                },
            ],
        },
        {
            id: "excel",
            open: false,
            title: "Cargar datos",
            icon: faHouse,
            href: "#",
            subHref: [
                {
                    title: "Cargar productos",
                    href: "/dashboard/subir-productos",
                },
                { title: "Cargar usuarios", href: "/dashboard/subir-usuarios" },
            ],
        },
    ]);

    const [userMenu, setUserMenu] = useState(false);

    const toggleDropdown = (id) => {
        setDropdowns((prevDropdowns) =>
            prevDropdowns.map((drop) => ({
                ...drop,
                open: drop.id === id ? !drop.open : false,
            }))
        );
    };

    const logout = (ev) => {
        ev.preventDefault();
        setAdminToken(null);
    };

    if (!adminToken) {
        return <Navigate to={"/adm"} />;
    }

    return (
        <div className="flex flex-row font-roboto-condensed">
            <AnimatePresence>
                {sidebar && (
                    <motion.div
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        exit={{ x: -300 }}
                        transition={{ ease: "linear", duration: 0.2 }}
                        className="flex flex-col h-screen w-[300px] bg-primary-red text-white overflow-y-auto scrollbar-hide"
                    >
                        <Link to={"/"} className="w-full p-6">
                            <img
                                className="w-full h-full object-cover"
                                src={rolomarLogo}
                                alt=""
                            />
                        </Link>
                        <nav className="">
                            <ul className="">
                                <AnimatePresence>
                                    {dropdowns.map((drop) => (
                                        <li key={drop.id}>
                                            <button
                                                onClick={() =>
                                                    toggleDropdown(drop.id)
                                                }
                                                className="flex flex-row w-full justify-between items-center  p-4"
                                            >
                                                <div className="flex flex-row gap-2 items-center">
                                                    <button
                                                        type="button"
                                                        className="w-4  h-4 flex items-center justify-center"
                                                    >
                                                        <FontAwesomeIcon
                                                            size="base"
                                                            icon={drop.icon}
                                                        />
                                                    </button>

                                                    <Link to={drop.href}>
                                                        {drop.title}
                                                    </Link>
                                                </div>
                                                <MotionFontAwesomeIcon
                                                    animate={{
                                                        rotate: drop.open
                                                            ? 90
                                                            : 0,
                                                    }}
                                                    transition={{
                                                        ease: "linear",
                                                        duration: 0.1,
                                                    }}
                                                    size="xs"
                                                    icon={faChevronRight}
                                                />
                                            </button>
                                            <AnimatePresence>
                                                {drop.open && (
                                                    <ul className="flex flex-col gap-2 overflow-hidden py-2 h-fit border-l ml-6">
                                                        {drop.subHref.map(
                                                            (sub, index) => (
                                                                <MotionLink
                                                                    className="mx-4 px-1"
                                                                    whileHover={{
                                                                        backgroundColor:
                                                                            "#fff",
                                                                        color: "#000",
                                                                    }}
                                                                    key={index}
                                                                    to={
                                                                        sub.href
                                                                    }
                                                                >
                                                                    {sub.title}
                                                                </MotionLink>
                                                            )
                                                        )}
                                                    </ul>
                                                )}
                                            </AnimatePresence>
                                        </li>
                                    ))}
                                </AnimatePresence>
                            </ul>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="w-full flex flex-col overflow-y-auto h-screen bg-[#f5f5f5]">
                <div className="sticky top-0 bg-white shadow-md py-3 flex flex-row justify-between items-center px-6 z-50">
                    <div className="flex flex-row gap-3">
                        <button onClick={() => setSidebar(!sidebar)}>
                            <FontAwesomeIcon
                                icon={faBars}
                                size="lg"
                                color="#000"
                            />
                        </button>
                        <h1 className="text-2xl">
                            {finalPath.charAt(0).toUpperCase() +
                                finalPath.slice(1) || "Bienvenido al Dashboard"}
                        </h1>
                    </div>

                    <div className="flex flex-row gap-3">
                        <div className="">
                            <h2>{adminInfo[0]?.name.toUpperCase()}</h2>
                        </div>
                        <button
                            className="relative "
                            onClick={() => setUserMenu(!userMenu)}
                        >
                            <FontAwesomeIcon color="#000" icon={faUser} />
                        </button>
                        <AnimatePresence>
                            {userMenu && (
                                <motion.div
                                    initial={{ opacity: 0, y: -30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -30 }}
                                    transition={{
                                        duration: 0.1,
                                        ease: "linear",
                                    }}
                                    className="flex flex-col items-start absolute border-2 shadow- w-[300px] h-fit right-2 top-10 p-4 bg-white gap-4 "
                                >
                                    <button
                                        onClick={logout}
                                        className="bg-primary-red text-white w-full h-[40px]"
                                    >
                                        Cerrar Sesion
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                <Outlet />
            </div>
        </div>
    );
}
