import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import defaultPhoto from "../assets/default-photo.png";
import CategoryCard from "../components/CategoryCard";
import { useStateContext } from "../contexts/ContextProvider";

export default function Productos() {
    const { categorias, metadatos, grupoDeProductos } = useStateContext();
    const [currentCategory, setCurrentCategory] = useState("");
    const [search, setSearch] = useState(false);
    const [descripcion, setDescripcion] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const encontrarCategoria = (id) => {
        return categorias.find((categoria) => categoria.id === id)?.nombre;
    };

    const quitarTildes = (cadena) => {
        return cadena
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    };

    const searchBarRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                searchBarRef.current &&
                !searchBarRef.current.contains(event.target)
            ) {
                setSearch(false); // Cierra el contenedor si se hace clic fuera
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="py-20 max-w-[1240px] mx-auto flex flex-col gap-y-10 justify-between flex-wrap">
            <meta
                name="description"
                content={
                    metadatos?.find(
                        (datos) => datos?.seccion?.toLowerCase() == "productos"
                    )?.descripcion
                }
            />
            <meta
                name="keywords"
                content={
                    metadatos?.find(
                        (datos) => datos?.seccion?.toLowerCase() == "productos"
                    )?.keywords
                }
            />
            <div className="h-[147px] flex items-center w-full ">
                <div
                    ref={searchBarRef}
                    className="flex flex-row relative justify-between w-full h-[55px] max-sm:flex-col max-sm:h-auto max-sm:gap-2 max-sm:px-6 gap-5"
                >
                    <select
                        onChange={(e) => setCurrentCategory(e.target.value)}
                        className="w-full text-primary-red pl-2 border max-sm:w-full max-sm:h-[55px]"
                    >
                        <option
                            className="text-black"
                            disabled
                            selected
                            value=""
                        >
                            Categorias
                        </option>
                        {categorias?.map((category, index) => (
                            <option key={index} value={category?.id}>
                                {category?.nombre}
                            </option>
                        ))}
                    </select>

                    <input
                        placeholder="Descripcion"
                        onChange={(e) => setDescripcion(e.target.value)}
                        className="pl-4 w-full outline-none border max-sm:w-full max-sm:h-[55px]"
                        type="text"
                    />
                    <button
                        onClick={() => {
                            if (currentCategory !== "") {
                                setSearch(true);
                            }
                        }}
                        className="bg-primary-red text-white min-w-[184px] h-[55px]"
                    >
                        Buscar
                    </button>
                    <AnimatePresence>
                        {search && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ ease: "linear" }}
                                className="absolute grid grid-cols-4 gap-4 p-4 bg-white border rounded-md h-[400px] w-full top-24 z-50 overflow-y-auto scrollbar-hide"
                            >
                                {grupoDeProductos
                                    ?.filter(
                                        (grupo) =>
                                            grupo?.categoria_id ==
                                                currentCategory &&
                                            grupo?.nombre
                                                ?.toLowerCase()
                                                .includes(
                                                    descripcion.toLowerCase()
                                                )
                                    )
                                    ?.map((grupo, index) => (
                                        <Link
                                            to={`/productos/${encontrarCategoria(
                                                grupo?.categoria_id
                                            )?.toLowerCase()}/${quitarTildes(
                                                grupo?.nombre
                                                    ?.split(" ")
                                                    .join("-")
                                                    .toLowerCase()
                                            )}`}
                                            key={index}
                                            className="flex flex-row items-center gap-2 hover:bg-gray-200 p-2"
                                        >
                                            <div className="w-full h-[100px] border">
                                                <img
                                                    className="w-full h-full object-cover"
                                                    src={
                                                        grupo?.images[0]
                                                            ?.image_url ||
                                                        defaultPhoto
                                                    }
                                                    onError={(e) => {
                                                        e.currentTarget.src =
                                                            defaultPhoto;
                                                    }}
                                                    alt=""
                                                />
                                            </div>

                                            <div className="flex flex-col w-full">
                                                <h2>{grupo?.nombre}</h2>
                                                <p>{grupo?.descripcion}</p>
                                            </div>
                                        </Link>
                                    ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="flex flex-row gap-y-7 flex-wrap gap-7 max-sm:flex-col max-sm:items-center max-sm:mt-20 ">
                {categorias
                    ?.slice() // Crear una copia para no mutar el estado original
                    .sort((a, b) => {
                        if (!isNaN(a.orden) && !isNaN(b.orden)) {
                            // Si ambos son números, ordenar numéricamente
                            return Number(a.orden) - Number(b.orden);
                        }
                        // Si contienen letras, ordenar alfabéticamente (case-insensitive)
                        return String(a.orden).localeCompare(
                            String(b.orden),
                            undefined,
                            { numeric: true }
                        );
                    })
                    .map((category) => (
                        <CategoryCard
                            key={category?.id}
                            categoryObject={category}
                        />
                    ))}
            </div>
        </div>
    );
}
