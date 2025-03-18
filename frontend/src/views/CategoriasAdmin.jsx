import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axiosClient from "../axios";
import CategoryAdminCard from "../components/CategoryAdminCard";
import { useStateContext } from "../contexts/ContextProvider";

export default function CategoriasAdmin() {
    const { categorias, fetchCategorias } = useStateContext();
    const [createView, setCreateView] = useState(false);

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

        const reposnse = axiosClient.post("/categorias", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        toast.promise(reposnse, {
            loading: "Guardando...",
            success: "Guardado correctamente",
            error: "Error al guardar",
        });

        try {
            await reposnse;
            fetchCategorias();
            setCreateView(false);
        } catch (error) {
            console.error("Error al guardar:", error);
        }
    };

    // Filtrar categorías por búsqueda
    const filteredCategorias = categorias
        .filter((category) =>
            category.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice() // Evita mutar el estado original
        .sort((a, b) => {
            if (!isNaN(a.orden) && !isNaN(b.orden)) {
                // Orden numérico si ambos son números
                return Number(a.orden) - Number(b.orden);
            }
            // Orden alfabético si son cadenas de texto
            return String(a.orden).localeCompare(String(b.orden), undefined, {
                numeric: true,
            });
        });

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
            <Toaster />
            <AnimatePresence>
                {createView && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50 text-left"
                    >
                        <form onSubmit={submit} className="text-black">
                            <div className="bg-white p-4 w-[500px] rounded-md">
                                <h2 className="text-2xl font-semibold mb-4">
                                    Crear categoria
                                </h2>
                                <div className="flex flex-col gap-4">
                                    <label htmlFor="imagenn">Imagen</label>
                                    <div className="flex flex-row">
                                        <input
                                            type="file"
                                            name="imagen"
                                            id="imagenn"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                        <label
                                            className="cursor-pointer bg-indigo-500 rounded-md text-white py-1 px-2"
                                            htmlFor="imagenn"
                                        >
                                            Elegir imagen
                                        </label>
                                        <p className="self-center px-2">
                                            {imagen?.name}
                                        </p>
                                    </div>
                                    <label htmlFor="nombree">
                                        Nombre{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        className="border border-gray-300 p-2 rounded-md"
                                        type="text"
                                        name="nombree"
                                        id="nombree"
                                        value={nombre}
                                        onChange={(e) =>
                                            setNombre(e.target.value)
                                        }
                                    />

                                    <label htmlFor="ordennn">Orden</label>
                                    <input
                                        className="border border-gray-300 p-2 rounded-md"
                                        type="text"
                                        name="ordennn"
                                        id="ordennn"
                                        value={orden}
                                        onChange={(e) =>
                                            setOrden(e.target.value)
                                        }
                                    />

                                    <div className="flex justify-end gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setCreateView(false)}
                                            className="bg-primary-red py-1 px-2 text-white rounded-md"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-blue-500 py-1 px-2 text-white rounded-md"
                                        >
                                            Guardar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="flex flex-col w-full px-6 mx-auto py-10 gap-3">
                <h1 className="text-2xl">Categorias</h1>
                <div className="w-full flex flex-row gap-5">
                    <input
                        type="text"
                        placeholder="Buscar categoría..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md w-full"
                    />
                    <button
                        onClick={() => setCreateView(true)}
                        className="bg-blue-500 hover:bg-blue-700 w-[200px] text-white font-bold py-1 px-4 rounded"
                    >
                        Crear categoria
                    </button>
                </div>

                <div className="flex justify-center w-full">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border">
                        <thead className="text-xs text-gray-600 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <td className="min-w-[200px] py-2 pl-3 text-center">
                                    IMAGEN
                                </td>
                                <td className="text-center">NOMBRE</td>
                                <td className="text-center">ORDEN</td>
                                <td className="text-center">EDITAR</td>
                            </tr>
                        </thead>
                        <tbody className="text-center">
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
