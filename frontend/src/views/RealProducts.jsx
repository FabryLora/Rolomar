import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axiosClient from "../axios";
import RealProductRowAdmin from "../components/RealProductRowAdmin";
import { useStateContext } from "../contexts/ContextProvider";

export default function RealProducts() {
    const { productos, grupoDeProductos, fetchProductos } = useStateContext();

    const [nombre, setNombre] = useState("");
    const [codigo, setCodigo] = useState("");
    const [precioMayorista, setPrecioMayorista] = useState("");
    const [precioMinorista, setPrecioMinorista] = useState("");
    const [image, setImage] = useState();
    const [grupoId, setGrupoId] = useState("");
    const [categoriaId, setCategoriaId] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [addWord, setAddWord] = useState("");

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const onSubmit = async (ev) => {
        ev.preventDefault();

        const formData = new FormData();
        formData.append("image", image ? image : null);
        formData.append("nombre", nombre);
        formData.append("codigo", codigo);
        formData.append("precio_minorista", precioMinorista);
        formData.append("precio_mayorista", precioMayorista);
        formData.append(
            "categoria_id",
            grupoDeProductos?.find((grupo) => grupo?.id == grupoId)
                ?.categoria_id
        );
        if (addWord) {
            formData.append("addword", addWord);
        }
        formData.append("grupo_de_productos_id", grupoId);
        formData.append("medida", "a");

        const response = axiosClient.post("/productos", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        toast.promise(response, {
            loading: "Guardando...",
            success: "Guardado correctamente",
            error: "Error al guardar",
        });

        try {
            await response;
            fetchProductos();
        } catch (err) {
            console.error("Error al guardar:", err);
        }
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Función para cambiar de página
    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const filteredProducts = productos?.filter((producto) =>
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    return (
        <div className="overflow-x-auto">
            <Toaster />
            <form
                onSubmit={onSubmit}
                className="p-5 flex flex-col justify-between h-fit"
            >
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                                <label
                                    htmlFor="cover-photo"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Imagen
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-2 flex justify-between rounded-lg border border-dashed border-gray-900/25 ">
                                    <div className="flex items-center justify-start p-4 w-1/2">
                                        <div className="text-center items-center h-fit self-center flex flex-row justify-start gap-3">
                                            <div className=" flex text-sm/6 text-gray-600">
                                                <label
                                                    className="cursor-pointer text-white bg-blue-500 px-4 py-2 rounded-md "
                                                    htmlFor="file-upload"
                                                >
                                                    Elegir imagen{" "}
                                                </label>
                                                <p>{image?.name}</p>
                                                <input
                                                    id="file-upload"
                                                    name="file-upload"
                                                    type="file"
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="name"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Nombre
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={nombre}
                                        onChange={(ev) => {
                                            setNombre(ev.target.value);
                                        }}
                                        id="name"
                                        name="name"
                                        type="text"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="code"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Codigo
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={codigo}
                                        onChange={(ev) => {
                                            setCodigo(ev.target.value);
                                        }}
                                        id="code"
                                        name="code"
                                        type="text"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="dolar"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Precio mayorista
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={precioMayorista}
                                        onChange={(ev) => {
                                            setPrecioMayorista(ev.target.value);
                                        }}
                                        id="dolar"
                                        name="dolar"
                                        type="text"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="dolar"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Precio minorista
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={precioMinorista}
                                        onChange={(ev) => {
                                            setPrecioMinorista(ev.target.value);
                                        }}
                                        id="dolar"
                                        name="dolar"
                                        type="text"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label
                                    htmlFor="addword"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Adword
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={addWord}
                                        onChange={(ev) => {
                                            setAddWord(ev.target.value);
                                        }}
                                        id="addword"
                                        name="addword"
                                        type="text"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="grupo"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Grupo de productos
                                </label>
                                <div className="mt-2">
                                    <select
                                        value={grupoId}
                                        onChange={(ev) => {
                                            setGrupoId(ev.target.value);
                                        }}
                                        id="grupo"
                                        name="grupo"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    >
                                        <option value="" disabled>
                                            Seleccione un grupo
                                        </option>
                                        {grupoDeProductos
                                            ?.slice() // Copia el array para no mutar el original
                                            .sort((a, b) =>
                                                a.nombre.localeCompare(b.nombre)
                                            )
                                            ?.map((prod, index) => (
                                                <option
                                                    key={index}
                                                    value={prod.id}
                                                >
                                                    {prod.nombre}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Crear producto
                        </button>
                    </div>
                </div>
            </form>
            <div className="flex justify-start mb-4 pl-4">
                <input
                    type="text"
                    placeholder="Buscar producto..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md"
                />
            </div>

            <div className="table w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 px-6 ">
                <div className="table-header-group text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <div className="table-row">
                        <div className="table-cell px-6 py-3">Imagen</div>
                        <div className="table-cell px-6 py-3">Nombre</div>
                        <div className="table-cell px-6 py-3">Código</div>
                        <div className="table-cell px-6 py-3">
                            Precio mayorista
                        </div>
                        <div className="table-cell px-6 py-3">
                            Precio minorista
                        </div>
                        <div className="table-cell px-6 py-3">
                            Grupo de productos
                        </div>
                        <div className="table-cell px-6 py-3">Adword</div>
                        <div className="table-cell py-3">Operaciones</div>
                    </div>
                </div>
                <div className="table-row-group text-black border border-black">
                    {currentItems &&
                        currentItems.map((info, index) => (
                            <RealProductRowAdmin
                                key={index}
                                productObject={info}
                            />
                        ))}
                </div>
            </div>
            <div className="flex justify-center py-4 space-x-4  text-white bg-gray-100">
                <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-md bg-gray-600 disabled:opacity-50"
                >
                    Anterior
                </button>
                <span className="px-4 py-2 bg-gray-800 text-white rounded-md">
                    Página {currentPage} de {totalPages}
                </span>
                <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-md bg-gray-600 disabled:opacity-50"
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}
