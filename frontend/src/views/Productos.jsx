import CategoryCard from "../components/CategoryCard";
import { useStateContext } from "../contexts/ContextProvider";

export default function Productos() {
    const { categorias } = useStateContext();

    return (
        <div className="py-20 max-w-[1240px] mx-auto flex flex-col gap-y-10 justify-between flex-wrap">
            <div className="h-[147px] flex items-center w-full">
                <div className="flex flex-row justify-between w-full  h-[55px]">
                    <select
                        className="w-[184px] text-primary-red pl-2 border"
                        name=""
                        id=""
                    >
                        <option
                            className="text-black"
                            disabled
                            selected
                            value=""
                        >
                            Marca
                        </option>
                    </select>
                    <select
                        className="w-[184px] text-primary-red pl-2 border"
                        name=""
                        id=""
                    >
                        <option disabled selected value="">
                            Codigo
                        </option>
                    </select>
                    <input
                        placeholder="Descripcion"
                        className="pl-4 w-[600px] outline-none border"
                        type="text"
                        name=""
                        id=""
                    />
                    <button className="bg-primary-red text-white w-[184px] ">
                        Buscar
                    </button>
                </div>
            </div>
            <div className="flex flex-row gap-5 flex-wrap">
                {categorias?.map((category, index) => (
                    <CategoryCard key={index} categoryObject={category} />
                ))}
            </div>
        </div>
    );
}
