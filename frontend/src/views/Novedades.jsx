import { useEffect } from "react";
import NovedadesCard from "../components/NovedadesCard";
import { useStateContext } from "../contexts/ContextProvider";

export default function Novedades() {
    const { novedades, metadatos } = useStateContext();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="py-20 max-w-[1240px] mx-auto flex flex-row gap-y-10 justify-between flex-wrap">
            <meta
                name="description"
                content={
                    metadatos?.find(
                        (datos) => datos?.seccion?.toLowerCase() == "novedades"
                    )?.descripcion
                }
            />
            <meta
                name="keywords"
                content={
                    metadatos?.find(
                        (datos) => datos?.seccion?.toLowerCase() == "novedades"
                    )?.keywords
                }
            />
            {novedades?.map((novedad, index) => (
                <NovedadesCard key={index} novedadObject={novedad} />
            ))}
        </div>
    );
}
