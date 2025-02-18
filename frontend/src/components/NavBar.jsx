import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function NavBar() {
    const { logos, setUserToken } = useStateContext();
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const [userMenu, setUserMenu] = useState(false);
    const [submiting, setSubmiting] = useState(false);
    const [error, setError] = useState(false);
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

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

    const onSubmit = (ev) => {
        ev.preventDefault();
        setSubmiting(true);
        setError(""); // Limpiar errores previos

        axiosClient
            .post("/login", {
                nomcuit: user,
                password: password,
            })
            .then(({ data }) => {
                setSubmiting(false);
                setUserToken(data.token);
            })
            .catch((error) => {
                setSubmiting(false);
                if (error.response && error.response.data.error) {
                    const errorMessage = error.response.data.error;
                    if (
                        errorMessage ===
                        "The provided credentials are not correct"
                    ) {
                        setError(
                            "Las credenciales proporcionadas son incorrectas."
                        );
                    } else if (
                        errorMessage ===
                        "Your account is not authorized. Please contact support."
                    ) {
                        setError("Tu cuenta no está autorizada.");
                    } else {
                        setError(
                            "Ocurrió un error inesperado. Inténtalo de nuevo."
                        );
                    }
                } else {
                    setError(
                        "Ocurrió un problema con la conexión. Inténtalo nuevamente."
                    );
                }
            });
    };

    return (
        <div
            className={`h-[100px] top-0 left-0 w-full z-40 items-center transition-all duration-300 ${
                scrolled || cleanPathname[0] !== "inicio"
                    ? "bg-white shadow-md text-black"
                    : "bg-transparent text-black"
            } ${cleanPathname[0] === "inicio" ? "fixed" : "sticky"}`}
        >
            <div className="flex flex-row items-center justify-between mx-auto max-w-[1240px] h-full">
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
                    <div className="relative">
                        <button
                            onClick={() => setUserMenu(!userMenu)}
                            className={` h-[41px] w-[154px] border transition-all ${
                                scrolled || cleanPathname[0] !== "inicio"
                                    ? "border-black text-black hover:bg-black hover:text-white"
                                    : "border-white text-white hover:bg-white hover:text-black"
                            } ${
                                cleanPathname[0] === "inicio"
                                    ? ""
                                    : "text-primary-red border-primary-red hover:text-black hover:bg-primary-red"
                            }`}
                        >
                            Zona Privada
                        </button>
                        <AnimatePresence>
                            {userMenu && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{
                                        duration: 0.1,
                                        ease: "linear",
                                    }}
                                    className="absolute flex flex-col gap-2 right-0 top-16 bg-white shadow-md p-5 w-fit h-fit z-20 border"
                                >
                                    {error && (
                                        <p className="h-99 w-99 break-words max-w-[300px] text-red-500">
                                            {error}
                                        </p>
                                    )}
                                    <h2 className="font-bold text-[24px] py-5">
                                        Iniciar Sesion
                                    </h2>
                                    <form
                                        onSubmit={onSubmit}
                                        className="w-fit h-full flex flex-col justify-around gap-3"
                                        action=""
                                    >
                                        <div className="flex flex-col gap-3">
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="user">
                                                    Usuario
                                                </label>
                                                <input
                                                    value={user}
                                                    onChange={(ev) =>
                                                        setUser(ev.target.value)
                                                    }
                                                    className="w-[328px] h-[45px] border pl-2"
                                                    type="text"
                                                    name="user"
                                                    id="user"
                                                    required
                                                />
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="password">
                                                    Contraseña
                                                </label>
                                                <input
                                                    value={password}
                                                    onChange={(ev) =>
                                                        setPassword(
                                                            ev.target.value
                                                        )
                                                    }
                                                    className="w-[328px] h-[45px] border pl-2"
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <button
                                            className={`w-[325px] h-[47px] bg-primary-red text-white self-center my-5 ${
                                                submiting ? "bg-gray-500" : ""
                                            }`}
                                            type="submit"
                                        >
                                            {submiting
                                                ? "INICIANDO SESION..."
                                                : "INICIAR SESION"}
                                        </button>
                                    </form>
                                    <div className="flex flex-col items-center">
                                        <p>¿No tenes usuario?</p>
                                        <Link
                                            className="text-primary-red"
                                            to={"/registro"}
                                        >
                                            REGISTRATE
                                        </Link>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
