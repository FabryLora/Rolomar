import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import defaultPhoto from "../assets/default-photo.png";
import { useStateContext } from "../contexts/ContextProvider";

export default function GeneralView() {
    const { categorias } = useStateContext();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const location = useLocation();

    const [cleanPathname, setCleanPathname] = useState(
        location.pathname.replace(/^\/+/, "").replace(/-/g, " ").split("/")
    );

    function quitarTildes(texto) {
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    useEffect(() => {
        setCleanPathname(
            location.pathname.replace(/^\/+/, "").replace(/-/g, " ").split("/")
        );
    }, [location]);

    return (
        <div className="py-20 max-w-[1240px] mx-auto flex flex-row justify-between gap-10 max-sm:flex-col">
            {/* Botón para abrir el sidebar en pantallas pequeñas */}
            <button
                className="sm:hidden bg-gray-800 text-white p-2 rounded-md mb-4 mx-6"
                onClick={() => setIsSidebarOpen(true)}
            >
                <FontAwesomeIcon icon={faBars} size="lg" />
            </button>

            {/* Sidebar en pantallas pequeñas */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex"
                    >
                        <div className="bg-white w-64 h-full p-4 shadow-lg overflow-y-auto">
                            <button
                                className="text-red-500 text-lg font-bold mb-4"
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                Cerrar
                            </button>
                            {categorias?.map((categoria, index) => (
                                <Link
                                    to={`/productos/${categoria?.id}`}
                                    key={index}
                                    className="block text-[16px] border-b border-gray-300 py-2"
                                    onClick={() => setIsSidebarOpen(false)}
                                >
                                    {categoria?.nombre
                                        ?.toUpperCase()
                                        .replace(/-+$/g, "")}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sidebar en pantallas grandes */}
            <div className="w-[20%] max-sm:hidden flex flex-col">
                {categorias?.map((categoria, index) => (
                    <Link
                        to={`/productos/${categoria?.id}`}
                        key={index}
                        className={`text-[16px] border-y border-[#EAEAEA] py-2 w-full text-left ${
                            Number(cleanPathname[1]) === categoria?.id
                                ? "font-bold"
                                : ""
                        }`}
                    >
                        {categoria?.nombre?.toUpperCase().replace(/-+$/g, "")}
                    </Link>
                ))}
            </div>

            <div className="w-full flex flex-row flex-wrap gap-10 h-fit max-sm:flex-col max-sm:items-center">
                {categorias
                    ?.find(
                        (category) => category?.id === Number(cleanPathname[1])
                    )
                    ?.grupos?.map((grupo, index) => (
                        <Link
                            to={`/productos/${cleanPathname[1]}/${grupo?.id}`}
                            key={index}
                            className="flex flex-col w-[288px] h-fit border max-sm:w-full max-sm:px-6"
                        >
                            <div className="w-full h-[270px] flex justify-center items-center">
                                <img
                                    className="w-full h-full object-cover"
                                    src={
                                        grupo?.imagen_url
                                            ? grupo?.imagen_url
                                            : defaultPhoto
                                    }
                                    alt=""
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = defaultPhoto;
                                    }}
                                />
                            </div>
                            <div className="flex items-center h-fit border-t pl-4 py-2">
                                <h2>{grupo?.nombre}</h2>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
}
