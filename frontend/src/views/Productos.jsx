import { useEffect } from "react";
import CategoryCard from "../components/CategoryCard";
import { useStateContext } from "../contexts/ContextProvider";

export default function Productos() {
    const { categorias, metadatos } = useStateContext();

    useEffect(() => {
        window.scrollTo(0, 0);
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
            <div className="h-[147px] flex items-center w-full">
                <div className="flex flex-row justify-between w-full h-[55px] max-sm:flex-col max-sm:h-auto max-sm:gap-2 max-sm:px-6">
                    <select className="w-[184px] text-primary-red pl-2 border max-sm:w-full max-sm:h-[55px]">
                        <option
                            className="text-black"
                            disabled
                            selected
                            value=""
                        >
                            Marca
                        </option>
                    </select>
                    <select className="w-[184px] text-primary-red pl-2 border max-sm:w-full max-sm:h-[55px]">
                        <option disabled selected value="">
                            Codigo
                        </option>
                    </select>
                    <input
                        placeholder="Descripcion"
                        className="pl-4 w-[600px] outline-none border max-sm:w-full max-sm:h-[55px]"
                        type="text"
                    />
                    <button className="bg-primary-red text-white w-[184px] max-sm:w-full max-sm:h-[55px]">
                        Buscar
                    </button>
                </div>
            </div>

            <div className="flex flex-row gap-5 flex-wrap max-sm:flex-col max-sm:items-center max-sm:mt-20 ">
                {categorias?.map((category, index) => (
                    <CategoryCard key={index} categoryObject={category} />
                ))}
            </div>
        </div>
    );
}
