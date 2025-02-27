export default function SearchBar() {
    return (
        <div className="h-[147px] bg-primary-red flex items-center py-4 md:py-0 max-md:h-fit">
            <div className="flex max-w-[1240px] mx-auto justify-between w-full px-6 md:px-0 flex-wrap md:flex-nowrap gap-4 md:gap-2 max-md:gap-5">
                <select
                    className="w-full md:w-[190px] text-primary-red pl-2 py-2"
                    name=""
                    id=""
                >
                    <option className="text-black" disabled selected value="">
                        Marca
                    </option>
                </select>
                <select
                    className="w-full md:w-[190px] text-primary-red pl-2 py-2"
                    name=""
                    id=""
                >
                    <option disabled selected value="">
                        Codigo
                    </option>
                </select>
                <input
                    placeholder="Descripcion"
                    className="pl-4 w-full md:w-[615px] outline-none py-2"
                    type="text"
                    name=""
                    id=""
                />
                <button className="bg-black text-white w-full md:w-[184px] py-2">
                    Buscar
                </button>
            </div>
        </div>
    );
}
