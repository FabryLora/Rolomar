export default function SearchBar() {
    return (
        <div className="h-[147px] bg-primary-red flex items-center">
            <div className="flex flex-row max-w-[1240px] mx-auto justify-between w-full h-[55px]">
                <select
                    className="w-[190px] text-primary-red pl-2"
                    name=""
                    id=""
                >
                    <option className="text-black" disabled selected value="">
                        Marca
                    </option>
                </select>
                <select
                    className="w-[190px] text-primary-red pl-2"
                    name=""
                    id=""
                >
                    <option disabled selected value="">
                        Codigo
                    </option>
                </select>
                <input
                    placeholder="Descripcion"
                    className="pl-4 w-[615px] outline-none"
                    type="text"
                    name=""
                    id=""
                />
                <button className="bg-black text-white w-[184px]">
                    Buscar
                </button>
            </div>
        </div>
    );
}
