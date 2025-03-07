import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axiosClient from "../axios";
import CategoryAdminCard from "../components/CategoryAdminCard";
import { useStateContext } from "../contexts/ContextProvider";

export default function CategoriasAdmin() {
    const { categorias, fetchCategorias } = useStateContext();

    const [imagen, setImagen] = useState();
    const [nombre, setNombre] = useState();
    const [orden, setOrden] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const itemsPerPage = 10;

    const handleFileChange = (e) => {
        setImagen(e.target.files[0]);
    };

    const submit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (imagen) {
            formData.append("imagen", imagen);
        }
        formData.append("nombre", nombre);
        formData.append("orden", orden);

        try {
            await axiosClient.post("/categorias", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            fetchCategorias();
            toast.success("Guardado correctamente");
        } catch (error) {
            toast.error("Error al guardar");
        }
    };

    // Filtrar categorías por búsqueda
    const filteredCategorias = categorias.filter((category) =>
        category.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calcular los datos a mostrar en la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredCategorias.slice(
        indexOfFirstItem,
        indexOfLastItem
    );
    const totalPages = Math.ceil(filteredCategorias.length / itemsPerPage);

    return (
        <div className="flex flex-col w-full">
            <ToastContainer />
            <div className="flex flex-col w-[90%] mx-auto py-10 gap-3">
                <h1 className="text-2xl">Categorias</h1>
                <input
                    type="text"
                    placeholder="Buscar categoría..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md w-full"
                />
                <div className="flex justify-center w-full">
                    <table className="w-full shadow-md">
                        <thead className="bg-gray-400">
                            <tr className="text-left">
                                <td className="min-w-[200px] py-2 pl-3">
                                    IMAGEN
                                </td>
                                <td>NOMBRE</td>
                                <td>ORDEN</td>
                                <td>EDITAR</td>
                            </tr>
                        </thead>
                        <tbody className="text-left">
                            <tr className="h-[80px]">
                                <td>
                                    <label
                                        htmlFor="imagen"
                                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded cursor-pointer text-center"
                                    >
                                        Seleccionar Imagen
                                    </label>
                                    <input
                                        id="imagen"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        type="file"
                                    />
                                </td>
                                <td className="table-cell">
                                    <input
                                        className="border border-gray-300 rounded-md px-3 py-2 ml-3"
                                        value={nombre}
                                        onChange={(e) =>
                                            setNombre(e.target.value)
                                        }
                                        type="text"
                                        placeholder="Nombre de la categoria"
                                    />
                                </td>
                                <td className="table-cell">
                                    <input
                                        className="border border-gray-300 rounded-md px-3 py-2"
                                        value={orden}
                                        onChange={(e) =>
                                            setOrden(e.target.value)
                                        }
                                        type="text"
                                        placeholder="Orden"
                                    />
                                </td>
                                <td className="table-cell">
                                    <button
                                        onClick={submit}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Crear categoria
                                    </button>
                                </td>
                            </tr>
                            {currentItems.map((category) => (
                                <CategoryAdminCard
                                    key={category.id}
                                    category={category}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Paginación */}
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-300 rounded-l-md disabled:opacity-50"
                    >
                        Anterior
                    </button>
                    <span className="px-4 py-2 bg-gray-200">
                        Página {currentPage} de {totalPages}
                    </span>
                    <button
                        onClick={() =>
                            setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages)
                            )
                        }
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-300 rounded-r-md disabled:opacity-50"
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    );
}
