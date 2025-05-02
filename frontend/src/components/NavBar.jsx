import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function NavBar() {
    const {
        logos,
        setUserToken,
        userToken,
        userInfo,
        clearCart,
        provincias,
        setCurrentUser,
        currentUser,
    } = useStateContext();
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const [userMenu, setUserMenu] = useState(false);
    const [submiting, setSubmiting] = useState(false);
    const [error, setError] = useState(false);
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [registro, setRegistro] = useState(false);
    const [tinyMenu, setTinyMenu] = useState(false);

    const menuRef = useRef(null);
    const tinyMenuRef = useRef(null);

    const [cleanPathname, setCleanPathname] = useState(
        location.pathname.replace(/^\/+/, "").replace(/-/g, " ").split("/")
    );

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setUserMenu(false);
                setRegistro(false); // Cierra el contenedor si se hace clic fuera
            }
            if (
                tinyMenuRef.current &&
                !tinyMenuRef.current.contains(event.target)
            ) {
                setTinyMenu(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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

    const [linksPrivado, setLinksPrivado] = useState([
        { title: "Productos", href: "/privado/productos", line: false },
        { title: "Carrito", href: "/privado/carrito", line: false },
        { title: "Mis pedidos", href: "/privado/mis-pedidos", line: false },
        {
            title: "Lista de precios",
            href: "/privado/lista-de-precios",
            line: false,
        },
    ]);

    const handleMouseEnter = (title) => {
        setLinks(
            links.map((link) =>
                link.title === title ? { ...link, line: true } : link
            )
        );
        setLinksPrivado(
            linksPrivado.map((link) =>
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
        setLinksPrivado(
            linksPrivado.map((link) =>
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

                setCurrentUser(data.user);
                setUserToken(data.token);
                console.log(currentUser);
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

    const [errorSignup, setErrorSignup] = useState(null);
    const [submitingSignup, setSubmitingSignup] = useState(false);

    const [userSubmitInfo, setUserSubmitInfo] = useState({
        nomcuit: "",
        email: "",
        password: "",
        password_confirmation: "",
        cuit: "",
        direccion: "",
        provincia: "",
        localidad: "",
        lista: "1",
    });

    const handleChange = (event) => {
        setUserSubmitInfo({
            ...userSubmitInfo,
            lista: event.target.value,
        });
    };

    const onSubmitSignup = (ev) => {
        ev.preventDefault();
        setSubmitingSignup(true);
        axiosClient
            .post("/signup", userSubmitInfo)
            .then(({ data }) => {
                setRegistro(false);
                toast.success(
                    "Usuario registrado correctamente. Espera a que un administrador apruebe tu cuenta.",
                    { position: "top-center", autoClose: 5000 }
                );
                setSubmitingSignup(false);
            })
            .catch((error) => {
                if (error.response) {
                    setErrorSignup(
                        Object.values(error.response.data.errors || {})
                            .flat()
                            .join(" ")
                    );
                } else {
                    setErrorSignup("Ocurrió un error. Intenta nuevamente.");
                }
                setSubmitingSignup(false);
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
            <ToastContainer />
            <div className="relative flex flex-row items-center justify-between max-md:justify-center mx-auto max-w-[1240px] h-full">
                <button
                    onClick={() => setTinyMenu(true)}
                    className="absolute left-6 md:hidden"
                >
                    <FontAwesomeIcon
                        icon={faBars}
                        color={` ${
                            scrolled || cleanPathname[0] !== "inicio"
                                ? "#000"
                                : "#fff"
                        }`}
                        size="xl"
                    />
                </button>
                <AnimatePresence>
                    {tinyMenu && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex flex-col justify-start"
                        >
                            <motion.div
                                ref={tinyMenuRef}
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -100, opacity: 0 }}
                                transition={{ duration: 0.2, ease: "linear" }}
                                className="relative h-screen bg-primary-red w-[70%]"
                            >
                                <button
                                    onClick={() => setTinyMenu(false)}
                                    className="absolute right-3 top-2"
                                >
                                    <FontAwesomeIcon icon={faX} color="#fff" />
                                </button>
                                <div className="flex flex-col p-4 pt-8 gap-4">
                                    {cleanPathname[0] !== "privado"
                                        ? links.map((link) => (
                                              <Link
                                                  onClick={() =>
                                                      setTinyMenu(false)
                                                  }
                                                  key={link.title}
                                                  to={link.href}
                                                  className={`text-lg transition-colors relative hover:text-gray-400 text-white`}
                                              >
                                                  {link.title}
                                              </Link>
                                          ))
                                        : linksPrivado.map((link) => (
                                              <Link
                                                  onClick={() =>
                                                      setTinyMenu(false)
                                                  }
                                                  key={link.title}
                                                  to={link.href}
                                                  className={`text-lg transition-colors relative hover:text-gray-400 text-white`}
                                              >
                                                  {link.title}
                                              </Link>
                                          ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
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
                <div className="flex flex-row gap-10 text-base items-center max-md:hidden">
                    {cleanPathname[0] !== "privado" &&
                        links.map((link) => (
                            <Link
                                key={link.title}
                                to={link.href}
                                className={`text-lg transition-colors relative ${
                                    cleanPathname[0] ===
                                        link?.title?.toLowerCase() &&
                                    "font-bold"
                                } ${
                                    scrolled || cleanPathname[0] !== "inicio"
                                        ? "text-black"
                                        : "text-white"
                                }`}
                                onMouseEnter={() =>
                                    handleMouseEnter(link.title)
                                }
                                onMouseLeave={() =>
                                    handleMouseLeave(link.title)
                                }
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
                    {cleanPathname[0] === "privado" &&
                        linksPrivado.map((link) => (
                            <Link
                                key={link.title}
                                to={link.href}
                                className={`text-lg transition-colors relative ${
                                    cleanPathname[1] ===
                                        link?.title?.toLowerCase() &&
                                    "font-bold"
                                } ${
                                    scrolled || cleanPathname[0] !== "inicio"
                                        ? "text-black"
                                        : "text-white"
                                }`}
                                onMouseEnter={() =>
                                    handleMouseEnter(link.title)
                                }
                                onMouseLeave={() =>
                                    handleMouseLeave(link.title)
                                }
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
                    <div ref={menuRef} className="relative">
                        <button
                            onClick={() => setUserMenu(!userMenu)}
                            className={` min-h-[41px] w-[154px] border transition-all ${
                                scrolled || cleanPathname[0] !== "inicio"
                                    ? "border-black text-black hover:bg-black hover:text-white"
                                    : "border-white text-white hover:bg-white hover:text-black"
                            } ${
                                cleanPathname[0] === "inicio"
                                    ? ""
                                    : "text-primary-red border-primary-red hover:text-black hover:bg-primary-red"
                            }`}
                        >
                            {userToken ? currentUser?.nomcuit : "Zona privada"}
                        </button>
                        <AnimatePresence>
                            {userMenu && cleanPathname[0] === "privado" && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{
                                        duration: 0.1,
                                        ease: "linear",
                                    }}
                                    className="absolute flex flex-col gap-2 right-0 top-14 bg-white shadow-md p-5 w-fit h-fit z-20 border"
                                >
                                    <div>
                                        <p className="text-lg">
                                            <span className="font-bold">
                                                {currentUser?.nomcuit}
                                            </span>
                                        </p>
                                        <p className="text-sm">
                                            {currentUser?.email}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            clearCart();
                                            setUserToken("");
                                        }}
                                        className="bg-primary-red text-white w-[200px] py-1"
                                    >
                                        Cerrar sesion
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <AnimatePresence>
                            {userMenu && cleanPathname[0] !== "privado" && (
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
                                        <button
                                            type="button"
                                            className="text-primary-red"
                                            onClick={() => {
                                                setRegistro(true);
                                                setUserMenu(false);
                                            }}
                                        >
                                            REGISTRATE
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <AnimatePresence>
                            {registro && cleanPathname[0] !== "privado" && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{
                                        duration: 0.1,
                                        ease: "linear",
                                    }}
                                    className="absolute right-0 top-16 flex flex-col gap-2 bg-white shadow-md p-5 font-roboto-condensed w-[600px] h-fit z-20 border"
                                >
                                    {errorSignup && (
                                        <div className="text-red-500">
                                            {errorSignup}
                                        </div>
                                    )}
                                    <h2 className="font-bold text-[24px] py-5">
                                        Registrarse
                                    </h2>
                                    <form
                                        onSubmit={onSubmitSignup}
                                        className="w-fit h-full flex flex-col gap-3"
                                    >
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="flex flex-col gap-2 col-span-2">
                                                <label htmlFor="name">
                                                    Nombre de usuario
                                                </label>
                                                <input
                                                    value={
                                                        userSubmitInfo.nomcuit
                                                    }
                                                    onChange={(ev) =>
                                                        setUserSubmitInfo({
                                                            ...userSubmitInfo,
                                                            nomcuit:
                                                                ev.target.value,
                                                        })
                                                    }
                                                    className="w-full h-[45px] border pl-2"
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    required
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="password">
                                                    Contraseña
                                                </label>
                                                <input
                                                    value={
                                                        userSubmitInfo.password
                                                    }
                                                    onChange={(ev) =>
                                                        setUserSubmitInfo({
                                                            ...userSubmitInfo,
                                                            password:
                                                                ev.target.value,
                                                        })
                                                    }
                                                    className="w-full h-[45px] border pl-2"
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    required
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="password_confirmation">
                                                    Confirmar contraseña
                                                </label>
                                                <input
                                                    value={
                                                        userSubmitInfo.password_confirmation
                                                    }
                                                    onChange={(ev) =>
                                                        setUserSubmitInfo({
                                                            ...userSubmitInfo,
                                                            password_confirmation:
                                                                ev.target.value,
                                                        })
                                                    }
                                                    className="w-full h-[45px] border pl-2"
                                                    type="password"
                                                    name="password_confirmation"
                                                    id="password_confirmation"
                                                    required
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="email">
                                                    Email
                                                </label>
                                                <input
                                                    value={userSubmitInfo.email}
                                                    onChange={(ev) =>
                                                        setUserSubmitInfo({
                                                            ...userSubmitInfo,
                                                            email: ev.target
                                                                .value,
                                                        })
                                                    }
                                                    className="w-full h-[45px] border pl-2"
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    required
                                                />
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="dni">
                                                    Cuit
                                                </label>
                                                <input
                                                    value={userSubmitInfo?.cuit}
                                                    onChange={(ev) =>
                                                        setUserSubmitInfo({
                                                            ...userSubmitInfo,
                                                            cuit: ev.target
                                                                .value,
                                                        })
                                                    }
                                                    className="w-full h-[45px] border pl-2"
                                                    type="text"
                                                    name="dni"
                                                    id="dni"
                                                    required
                                                />
                                            </div>

                                            <div className="flex flex-col gap-2 col-span-2">
                                                <label htmlFor="direccion">
                                                    Dirección
                                                </label>
                                                <input
                                                    value={
                                                        userSubmitInfo.direccion
                                                    }
                                                    onChange={(ev) =>
                                                        setUserSubmitInfo({
                                                            ...userSubmitInfo,
                                                            direccion:
                                                                ev.target.value,
                                                        })
                                                    }
                                                    className="w-full h-[45px] border pl-2"
                                                    type="text"
                                                    name="direccion"
                                                    id="direccion"
                                                    required
                                                />
                                            </div>
                                            <div className="grid grid-cols-3 col-span-2 gap-5">
                                                <div className="flex flex-col gap-2">
                                                    <label htmlFor="provincia">
                                                        Provincia
                                                    </label>
                                                    <select
                                                        required
                                                        value={
                                                            userSubmitInfo.provincia
                                                        }
                                                        onChange={(ev) =>
                                                            setUserSubmitInfo({
                                                                ...userSubmitInfo,
                                                                provincia:
                                                                    ev.target
                                                                        .value,
                                                                localidad: "",
                                                            })
                                                        }
                                                        className="py-2 border h-[45px]"
                                                        name="provincia"
                                                        id="provincia"
                                                    >
                                                        <option value="">
                                                            Selecciona una
                                                            provincia
                                                        </option>

                                                        {provincias.map(
                                                            (pr) => (
                                                                <option
                                                                    key={pr.id}
                                                                    value={
                                                                        pr.name
                                                                    }
                                                                >
                                                                    {pr.name}
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <label htmlFor="localidad">
                                                        Localidad
                                                    </label>
                                                    <select
                                                        required
                                                        value={
                                                            userSubmitInfo.localidad
                                                        }
                                                        onChange={(ev) =>
                                                            setUserSubmitInfo({
                                                                ...userSubmitInfo,
                                                                localidad:
                                                                    ev.target
                                                                        .value,
                                                            })
                                                        }
                                                        className="py-2 border h-[45px]"
                                                        name="localidad"
                                                        id="localidad"
                                                    >
                                                        <option value="">
                                                            Selecciona una
                                                            localidad
                                                        </option>
                                                        {provincias
                                                            .find(
                                                                (pr) =>
                                                                    pr.name ===
                                                                    userSubmitInfo.provincia
                                                            )
                                                            ?.localidades.map(
                                                                (
                                                                    loc,
                                                                    index
                                                                ) => (
                                                                    <option
                                                                        key={
                                                                            index
                                                                        }
                                                                        value={
                                                                            loc.name
                                                                        }
                                                                    >
                                                                        {
                                                                            loc.name
                                                                        }
                                                                    </option>
                                                                )
                                                            )}
                                                    </select>
                                                </div>
                                                <div className="flex flex-col gap-4">
                                                    <h2 className="text-base font-normal m-0">
                                                        Tipo de cliente
                                                    </h2>
                                                    <div className="flex flex-row gap-2">
                                                        <label className="flex items-center gap-1 cursor-pointer">
                                                            <input
                                                                type="radio"
                                                                name="tipo_usuario"
                                                                value="1"
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                className="form-radio text-blue-600"
                                                                checked={
                                                                    userSubmitInfo?.lista ===
                                                                    "1"
                                                                }
                                                            />
                                                            <span>
                                                                Bombista
                                                            </span>
                                                        </label>
                                                        <label className="flex items-center gap-1 cursor-pointer">
                                                            <input
                                                                type="radio"
                                                                name="tipo_usuario"
                                                                value="2"
                                                                onChange={
                                                                    handleChange
                                                                }
                                                                checked={
                                                                    userSubmitInfo?.lista ===
                                                                    "2"
                                                                }
                                                                className="form-radio text-blue-600"
                                                            />
                                                            <span>
                                                                Mayorista
                                                            </span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            className={`w-[325px] h-[47px] bg-primary-red text-white self-center my-5 ${
                                                submitingSignup
                                                    ? "bg-gray-400"
                                                    : ""
                                            }`}
                                            type="submit"
                                        >
                                            {submitingSignup
                                                ? "Cargando..."
                                                : "REGISTRARSE"}
                                        </button>
                                    </form>
                                    <div className="flex flex-col items-center">
                                        <p>¿Ya tienes una cuenta?</p>
                                        <button
                                            type="button"
                                            className="text-primary-red"
                                            onClick={() => {
                                                setRegistro(false);
                                                setUserMenu(true);
                                            }}
                                        >
                                            INICIAR SESIÓN
                                        </button>
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
