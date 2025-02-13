import NovedadesCard from "../components/NovedadesCard";
import { useStateContext } from "../contexts/ContextProvider";

export default function Novedades() {
    const { novedades } = useStateContext();

    return (
        <div className="py-20 max-w-[1240px] mx-auto flex flex-row gap-y-10 justify-between flex-wrap">
            {novedades?.map((novedad, index) => (
                <NovedadesCard key={index} novedadObject={novedad} />
            ))}
        </div>
    );
}
