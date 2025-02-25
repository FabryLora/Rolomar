import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import defaultPhoto from "../assets/default-photo.png";
import { useStateContext } from "../contexts/ContextProvider";

export default function GeneralView() {
    const { categorias } = useStateContext();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const location = useLocation();

    const [cleanPathname, setCleanPathname] = useState(
        location.pathname.replace(/^\/+/, "").replace(/-/g, " ").split("/")
    );

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    function quitarTildes(texto) {
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    useEffect(() => {
        setCleanPathname(
            location.pathname.replace(/^\/+/, "").replace(/-/g, " ").split("/")
        );
    }, [location]);

    return (
        <div className="py-20 max-w-[1240px] mx-auto flex flex-row justify-between gap-10">
            <div className="w-[20%] max-sm:w-full flex flex-col">
                {categorias?.map((categoria, index) => (
                    <Link
                        to={`/productos/${quitarTildes(
                            categoria?.nombre
                                ?.split(" ")
                                ?.join("-")
                                ?.toLowerCase()
                                ?.replace(/-+$/g, "")
                        )}`}
                        key={index}
                        className={`text-[16px] border-y border-[#EAEAEA] py-2 w-full text-left ${
                            cleanPathname[1].split(" ").join("-") ===
                            quitarTildes(
                                categoria?.nombre?.split(" ")?.join("-")
                            )
                                ?.toLowerCase()
                                .replace(/-+$/g, "")
                                ? "font-bold"
                                : ""
                        }`}
                    >
                        {categoria?.nombre?.toUpperCase().replace(/-+$/g, "")}
                    </Link>
                ))}
            </div>
            <div className="w-full flex flex-row flex-wrap gap-10 min-h-[800px]">
                {categorias
                    ?.find(
                        (category) =>
                            quitarTildes(
                                category?.nombre
                                    ?.split(" ")
                                    ?.join("-")
                                    .toLowerCase()
                                    .replace(/-+$/g, "")
                            ) === cleanPathname[1].split(" ").join("-")
                    )
                    ?.grupos?.map((grupo, index) => (
                        <Link
                            to={`/productos/${cleanPathname[1]}/${quitarTildes(
                                grupo?.nombre
                                    ?.split(" ")
                                    .join("-")
                                    .toLowerCase()
                                    .replace(/-+$/g, "")
                            )}`}
                            key={index}
                            className="flex flex-col w-[288px] h-fit border"
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
