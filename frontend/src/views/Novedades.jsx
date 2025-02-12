import NovedadesCard from "../components/NovedadesCard";
import { useStateContext } from "../contexts/ContextProvider";

export default function Novedades() {
    const { novedades } = useStateContext();

    return (
        <div className="py-20 px-20 flex flex-row gap-10 flex-wrap">
            {novedades?.map((novedad, index) => (
                <NovedadesCard key={index} novedadObject={novedad} />
            ))}
        </div>
    );
}
