import { motion } from "motion/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import BrandSlider from "../components/BrandSlider";
import Carousel from "../components/Carousel";
import NovedadesCard from "../components/NovedadesCard";
import SearchBar from "../components/SearchBar";
import { useStateContext } from "../contexts/ContextProvider";

export default function Home() {
    const { nosotrosInicio, novedades, grupoDeProductos, categorias } =
        useStateContext();

    const encontrarCategoria = (id) => {
        return categorias.find((categoria) => categoria.id === id)?.nombre;
    };

    const quitarTildes = (cadena) => {
        return cadena
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="overflow-hidden">
            <Carousel />
            <SearchBar />
            <div className="max-w-[1240px] mx-auto py-10">
                <div>
                    <h1 className="text-4xl font-bold">Productos destacados</h1>
                    <div className="flex flex-row flex-wrap justify-between gap-y-10">
                        {grupoDeProductos
                            ?.filter((grup) => grup?.destacado == "1")
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
            <div className="flex flex-row h-[700px] my-10 bg-primary-red">
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="w-full"
                >
                    <img
                        className="w-full h-full object-cover"
                        src={nosotrosInicio?.image_url}
                        alt=""
                    />
                </motion.div>
                <style>
                    {`
                    .custom-container ul, ol, li, h1, h2, h3,h4,h5,h6 {
                        all: revert;
                    }
                        .custom-container div > span {
                                        font-size: 16px !important; /* Cambia 1.25rem a 1rem */
                                    }
                                    .custom-container  p {
                                        font-size: 16px !important; /* Cambia 1.25rem a 1rem */
                                    }
                    `}
                </style>
                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="flex flex-col w-full"
                >
                    <div
                        dangerouslySetInnerHTML={{
                            __html: nosotrosInicio?.text,
                        }}
                        className="custom-container w-full h-full  prose prose-sm sm:prose lg:prose-lg xl:prose-xl text-white px-20 pt-20"
                    ></div>
                    <button className="h-[41px] w-[181px] bg-white text-primary-red mx-20 mb-10">
                        Más información
                    </button>
                </motion.div>
            </div>
            <BrandSlider />
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="flex flex-row flex-wrap justify-between max-w-[1240px] mx-auto  py-10"
            >
                {novedades
                    .filter((novedad) => Number(novedad?.featured) === 1)
                    .map((novedad) => (
                        <NovedadesCard
                            key={novedad.id}
                            novedadObject={novedad}
                        />
                    ))}
            </motion.div>
        </div>
    );
}
