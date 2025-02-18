import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function MultipleView() {
    const { categorias, grupoDeProductos } = useStateContext();
    const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const location = useLocation();

    const encontrarCategoria = (id) => {
        return categorias.find((categoria) => categoria.id === id)?.nombre;
    };

    const grupoObjeto = grupoDeProductos?.find(
        (grupo) =>
            quitarTildes(grupo?.nombre?.split(" ").join("-").toLowerCase()) ===
            id
    );

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
            <div className="w-fit max-sm:w-full flex flex-col ">
                {categorias?.map((categoria, index) => (
                    <Link
                        to={`/productos/${quitarTildes(
                            categoria?.nombre
                                ?.split(" ")
                                ?.join("-")
                                ?.toLowerCase()
                        )}`}
                        key={index}
                        className={`text-[16px] border-y border-[#EAEAEA] py-2 w-full pr-20 text-left ${
                            cleanPathname[1] ===
                            quitarTildes(
                                categoria?.nombre?.split(" ")?.join("-")
                            )?.toLowerCase()
                                ? "font-bold"
                                : ""
                        }`}
                    >
                        {categoria?.nombre?.toUpperCase()}
                    </Link>
                ))}
            </div>

            <div className="w-full flex flex-col">
                <div className="flex flex-row h-[496px]  mb-32">
                    <div className="w-full relative border">
                        <button className="absolute border -bottom-24 w-[80px] h-[80px]"></button>
                    </div>
                    <div className="w-full flex flex-col justify-between">
                        <h2 className="text-2xl font-bold p-5">
                            {grupoObjeto?.nombre}
                        </h2>
                        <button className="border h-[41px] text-white bg-primary-red font-bold mx-5">
                            Consultar
                        </button>
                    </div>
                </div>

                <table>
                    <thead>
                        <tr className="border-b">
                            <th></th>
                            <th className="text-left py-2">CODIGO</th>
                            <th className="text-left">DESCRIPCION</th>
                            <th className="text-left">MEDIDA</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {grupoObjeto?.productos?.map((producto, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-2">
                                    <div className="w-[61px] h-[61px] border"></div>
                                </td>
                                <td>{producto?.codigo}</td>
                                <td>{producto?.nombre}</td>
                                <td>{producto?.medida}</td>
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
                    <h2 className="font-bold text-2xl">
                        Productos relacionados
                    </h2>
                    <div className="flex flex-row flex-wrap justify-between gap-y-10">
                        {grupoDeProductos
                            ?.filter(
                                (grup) =>
                                    grup?.categoria_id ===
                                    grupoObjeto?.categoria_id
                            )
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
                                    )}`}
                                    key={index}
                                    className="w-[288px] h-[347px] border"
                                >
                                    <div className="h-[85%] w-full">
                                        <img
                                            className="w-full h-full object-contain"
                                            src={grupo?.imagen_url}
                                            alt=""
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
