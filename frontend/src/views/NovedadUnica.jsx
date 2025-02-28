import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function NovedadUnica() {
    const { novedades, fetchNovedades } = useStateContext();
    const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchNovedades();
    }, []);

    const novedad = novedades.find((novedad) => novedad.id === Number(id));

    return (
        <div className="h-fit bg-gray-50 min-h-[1400px]">
            {/* Imagen principal */}
            <div className="w-full h-[400px] md:h-[500px] lg:h-[600px]">
                <img
                    className="w-full h-full object-cover shadow-lg"
                    src={novedad?.image_url}
                    alt={novedad?.title}
                />
            </div>

            {/* Contenido de la novedad */}
            <div className="max-w-[1240px] mx-auto  py-8 max-sm:px-6">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 leading-tight">
                    {novedad?.title}
                </h1>
                <p className="text-lg md:text-xl mt-4 text-gray-700 leading-relaxed break-words whitespace-pre-line">
                    {novedad?.text}
                </p>
            </div>
        </div>
    );
}
