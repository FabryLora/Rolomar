import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import defaultPhoto from "../assets/default-photo.png";
import { useStateContext } from "../contexts/ContextProvider";

export default function MultipleView() {
    const { categorias, grupoDeProductos } = useStateContext();
    const { id } = useParams();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const encontrarCategoria = (id) => {
        return categorias.find((categoria) => categoria.id === id)?.nombre;
    };

    const grupoObjeto = grupoDeProductos?.find(
        (grupo) =>
            quitarTildes(
                grupo?.nombre
                    ?.split(" ")
                    .join("-")
                    .toLowerCase()
                    .replace(/-+$/g, "")
            ) === id
    );

    function quitarTildes(texto) {
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    return (
        <div className="py-20 max-w-[1240px] mx-auto flex flex-row justify-between gap-10 max-sm:flex-col">
            {/* BOTÓN MENÚ SOLO EN MÓVILES */}
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="hidden max-sm:block text-2xl p-2 bg-gray-200 rounded-lg"
            >
                <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
            </button>

            {/* SIDEBAR SOLO EN MÓVILES */}
            <div
                className={`max-sm:fixed max-sm:top-0 max-sm:left-0 max-sm:w-[60%] max-sm:h-full max-sm:bg-white max-sm:shadow-lg max-sm:p-5 max-sm:transition-transform max-sm:duration-300 max-sm:z-50 max-sm:overflow-y-auto max-sm:scrollbar-hide
                ${
                    menuOpen
                        ? "max-sm:translate-x-0"
                        : "max-sm:-translate-x-full"
                } 
                w-[20%] max-sm:w-full flex flex-col`}
            >
                {/* BOTÓN CERRAR MENU SOLO EN MÓVILES */}
                <button
                    onClick={() => setMenuOpen(false)}
                    className="hidden max-sm:block text-right text-xl mb-4"
                >
                    <FontAwesomeIcon icon={faTimes} />
                </button>

                {categorias?.map((categoria, index) => (
                    <Link
                        to={`/productos/${quitarTildes(
                            categoria?.nombre
                                ?.split(" ")
                                ?.join("-")
                                ?.toLowerCase()
                                .replace(/-+$/g, "")
                        )}`}
                        key={index}
                        className="text-[16px] border-y border-[#EAEAEA] py-2 w-full text-left"
                        onClick={() => setMenuOpen(false)} // Cierra el menú al hacer clic
                    >
                        {categoria?.nombre?.toUpperCase().replace(/-+$/g, "")}
                    </Link>
                ))}
            </div>

            {/* CONTENIDO PRINCIPAL */}
            <div className="w-full flex flex-col">
                <div className="flex flex-row h-[496px] mb-32 max-sm:flex-col max-sm:gap-24">
                    <div className="w-full relative max-sm:px-6">
                        <img
                            className="w-full h-full object-contain"
                            src={grupoObjeto?.imagen_url || defaultPhoto}
                            alt=""
                        />
                        <button className="absolute border -bottom-24 w-[80px] h-[80px]">
                            <img
                                src={grupoObjeto?.imagen_url || defaultPhoto}
                                alt=""
                            />
                        </button>
                    </div>
                    <div className="w-full flex flex-col justify-between ">
                        <h2 className="text-2xl font-bold p-5">
                            {grupoObjeto?.nombre}
                        </h2>
                        <button className="border h-[41px] text-white bg-primary-red font-bold mx-5">
                            Consultar
                        </button>
                    </div>
                </div>

                <table className="max-sm:mt-32">
                    <thead>
                        <tr className="border-b">
                            <th></th>
                            <th className="text-left py-2">CODIGO</th>
                            <th className="text-left">DESCRIPCION</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {grupoObjeto?.productos?.map((producto, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-2">
                                    <div className="w-[61px] h-[61px] border">
                                        <img
                                            src={
                                                grupoObjeto?.imagen_url ||
                                                defaultPhoto
                                            }
                                            alt=""
                                        />
                                    </div>
                                </td>
                                <td>{producto?.codigo}</td>
                                <td>{producto?.nombre}</td>
                                <td className="text-center">
                                    <button className="w-[181px] h-[41px] border border-primary-red text-primary-red hover:bg-primary-red hover:text-white">
                                        Consultar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="py-10 flex flex-col gap-5">
                    <h2 className="font-bold text-2xl text-left">
                        Productos relacionados
                    </h2>
                    <div className="flex flex-row flex-wrap justify-between gap-y-10 max-sm:justify-center">
                        {grupoDeProductos
                            ?.filter(
                                (grup) =>
                                    grup?.categoria_id ===
                                    grupoObjeto?.categoria_id
                            )
                            ?.slice(0, 6)
                            ?.map((grupo, index) => (
                                <Link
                                    onClick={() => window.scrollTo(0, 0)}
                                    to={`/productos/${encontrarCategoria(
                                        grupo?.categoria_id
                                    )?.toLowerCase()}/${quitarTildes(
                                        grupo?.nombre
                                            ?.split(" ")
                                            .join("-")
                                            .toLowerCase()
                                            .replace(/-+$/g, "")
                                    )}`}
                                    key={index}
                                    className="w-[288px] h-[347px] border"
                                >
                                    <div className="h-[85%] w-full">
                                        <img
                                            className="w-full h-full object-contain"
                                            src={
                                                grupo?.imagen_url
                                                    ? grupo?.imagen_url
                                                    : defaultPhoto
                                            }
                                            alt=""
                                            onError={(e) => {
                                                e.target.src = defaultPhoto;
                                            }}
                                        />
                                    </div>
                                    <div className="h-[15%] w-full border-t">
                                        <h2 className="pl-2 text-base font-bold">
                                            {grupo?.nombre}
                                        </h2>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
