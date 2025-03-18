import { motion } from "motion/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import defaultPhoto from "../assets/default-photo.png";
import BrandSlider from "../components/BrandSlider";
import Carousel from "../components/Carousel";
import NovedadesCard from "../components/NovedadesCard";
import SearchBar from "../components/SearchBar";
import { useStateContext } from "../contexts/ContextProvider";

export default function Home() {
    const {
        nosotrosInicio,
        novedades,
        grupoDeProductos,
        categorias,
        metadatos,
    } = useStateContext();

    const encontrarCategoria = (id) => {
        return categorias.find((categoria) => categoria.id === id)?.id;
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="overflow-hidden">
            <meta
                name="description"
                content={
                    metadatos?.find(
                        (datos) => datos?.seccion?.toLowerCase() == "inicio"
                    )?.descripcion
                }
            />
            <meta
                name="keywords"
                content={
                    metadatos?.find(
                        (datos) => datos?.seccion?.toLowerCase() == "inicio"
                    )?.keywords
                }
            />
            <Carousel />
            <SearchBar />
            <div className="max-w-[1240px] mx-auto py-10">
                <div>
                    <div className="w-full flex flex-row justify-between items-center">
                        <h1 className="text-4xl font-bold max-md:px-6">
                            Productos destacados
                        </h1>
                        <Link
                            to={"/productos"}
                            className="w-[122px] h-[41px] flex justify-center items-center font-bold border border-primary-red text-primary-red hover:text-white hover:bg-primary-red"
                        >
                            Ver todos
                        </Link>
                    </div>

                    <div className="flex flex-row flex-wrap justify-between gap-y-10 max-sm:flex-col max-sm:items-center">
                        {grupoDeProductos
                            ?.filter((grup) => grup?.destacado == "1")
                            ?.map((grupo, index) => (
                                <Link
                                    to={`/productos/${encontrarCategoria(
                                        grupo?.categoria_id
                                    )}/${grupo?.id}`}
                                    key={index}
                                    className="w-[288px] h-[347px] border"
                                >
                                    <div className="h-[280px] w-full">
                                        <img
                                            className="w-full h-full object-cover"
                                            src={
                                                grupo?.imagen_url ||
                                                defaultPhoto
                                            }
                                            onError={(e) =>
                                                (e.currentTarget.src =
                                                    defaultPhoto)
                                            }
                                            alt=""
                                        />
                                    </div>
                                    <div className="h-fit w-full border-t">
                                        <h2 className="pl-2 text-base font-bold">
                                            {grupo?.nombre}
                                        </h2>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-row h-[700px] max-md:h-[900px] my-10 bg-primary-red max-md:flex-col">
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
                    className="flex flex-col w-full max-md:items-center max-md:justify-center"
                >
                    <div className="flex flex-col h-full px-20 pt-20 gap-10">
                        <h2 className="text-white text-3xl font-normal">
                            {nosotrosInicio?.title}
                        </h2>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: nosotrosInicio?.text,
                            }}
                            className="custom-container w-full h-full  prose prose-sm sm:prose lg:prose-lg xl:prose-xl text-white  max-md:p-6"
                        />
                    </div>

                    <Link
                        to={"/nosotros"}
                        className="h-[41px] w-[181px] bg-white text-primary-red mx-20 mb-10 flex justify-center items-center"
                    >
                        Más información
                    </Link>
                </motion.div>
            </div>
            <BrandSlider />
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="flex flex-row flex-wrap justify-between max-w-[1240px] mx-auto py-10 max-md:justify-center max-md:p-5 max-md:gap-y-10"
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
