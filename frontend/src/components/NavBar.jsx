import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function NavBar() {
    const { logos } = useStateContext();
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    const [cleanPathname, setCleanPathname] = useState(
        location.pathname.replace(/^\/+/, "").replace(/-/g, " ").split("/")
    );

    useEffect(() => {
        setCleanPathname(
            location.pathname.replace(/^\/+/, "").replace(/-/g, " ").split("/")
        );
    }, [location]);

    // Detectar el scroll para cambiar el fondo
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50); // Cambia cuando baja 50px
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const [links, setLinks] = useState([
        { title: "Nosotros", href: "/nosotros", line: false },
        { title: "Productos", href: "/productos", line: false },
        { title: "Novedades", href: "/novedades", line: false },
        { title: "Contacto", href: "/contacto", line: false },
    ]);

    const handleMouseEnter = (title) => {
        setLinks(
            links.map((link) =>
                link.title === title ? { ...link, line: true } : link
            )
        );
    };

    const handleMouseLeave = (title) => {
        setLinks(
            links.map((link) =>
                link.title === title ? { ...link, line: false } : link
            )
        );
    };

    return (
        <div
            className={`h-[100px] top-0 left-0 w-full z-40 flex flex-row justify-between items-center px-20 transition-all duration-300 ${
                scrolled || cleanPathname[0] !== "inicio"
                    ? "bg-white shadow-md text-black"
                    : "bg-transparent text-black"
            } ${cleanPathname[0] === "inicio" ? "fixed" : "sticky"}`}
        >
            <Link to="/" className="h-[77px] w-[125px]">
                <img
                    className="w-full h-full object-cover"
                    src={
                        scrolled || cleanPathname[0] !== "inicio"
                            ? logos?.secundario_url
                            : logos?.principal_url
                    }
                    alt="Logo"
                />
            </Link>
            <div className="flex flex-row gap-10 text-base items-center">
                {links.map((link) => (
                    <Link
                        key={link.title}
                        to={link.href}
                        className={`text-lg transition-colors relative ${
                            scrolled || cleanPathname[0] !== "inicio"
                                ? "text-black"
                                : "text-white"
                        }`}
                        onMouseEnter={() => handleMouseEnter(link.title)}
                        onMouseLeave={() => handleMouseLeave(link.title)}
                    >
                        {link.title}
                        <AnimatePresence>
                            {link.line && (
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    exit={{ width: 0 }}
                                    className={`h-[3px] w-full absolute -bottom-1 left-0 ${
                                        cleanPathname[0] === "inicio" &&
                                        !scrolled
                                            ? "bg-white"
                                            : "bg-black"
                                    }`} // Cambiar color de la línea
                                ></motion.div>
                            )}
                        </AnimatePresence>
                    </Link>
                ))}
                <button
                    className={`h-[41px] w-[154px] border transition-all ${
                        scrolled || cleanPathname[0] !== "inicio"
                            ? "border-black text-black hover:bg-black hover:text-white"
                            : "border-white text-white hover:bg-white hover:text-black"
                    }`}
                >
                    Zona Privada
                </button>
            </div>
        </div>
    );
}
