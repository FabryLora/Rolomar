import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axiosClient from "../axios";
import GrupoDeProductoRow from "../components/GrupoDeProductoRow";
import { useStateContext } from "../contexts/ContextProvider";

export default function GruposDeProductos() {
    const {
        categorias,

        fetchGrupoDeProductos,
        grupoDeProductos,
    } = useStateContext();

    const [nombre, setNombre] = useState();
    const [imagen, setImagen] = useState();
    const [destacado, setDestacado] = useState(null);
    const [orden, setOrden] = useState();
    const [categoriaId, setCategoriaId] = useState();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Calcular el total de páginas
    const totalPages = Math.ceil(grupoDeProductos?.length / itemsPerPage);

    // Obtener los productos de la página actual
    const currentItems = grupoDeProductos?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleFileChange = (e) => {
        setImagen(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const grupoData = new FormData();

            grupoData.append("nombre", nombre);
            if (imagen) {
                grupoData.append("imagen", imagen);
            }
            if (orden) {
                grupoData.append("orden", orden);
            }

            grupoData.append("destacado", destacado ? 1 : 0);

            grupoData.append("categoria_id", categoriaId);

            // 1. Crear el producto
            const grupoResponse = await axiosClient.post(
                "/grupo-de-productos",
                grupoData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log(grupoResponse);

            toast.success("Guardado correctamente");
            fetchGrupoDeProductos();
        } catch (err) {
            toast.error("Error al guardar");
        }
    };

    console.log(categoriaId);

    return (
        <div className="relative overflow-x-auto">
            <ToastContainer />
            <form
                onSubmit={handleSubmit}
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
                                    Imagen de Portada
                                </label>
                                <div className="mt-2 flex justify-between rounded-lg border border-dashed border-gray-900/25 ">
                                    <div className="flex items-center justify-start p-4 w-1/2">
                                        <div className="text-center items-center h-fit self-center flex flex-row justify-start gap-3">
                                            <div className="items-center gap-2 flex text-sm/6 text-gray-600">
                                                <label
                                                    className="bg-indigo-600 text-white py-2 px-3 rounded-md cursor-pointer"
                                                    htmlFor="portada"
                                                >
                                                    Elegir Imagen
                                                </label>
                                                {imagen?.name}
                                                <input
                                                    className="hidden"
                                                    accept="image/*"
                                                    id="portada"
                                                    name="file-upload"
                                                    type="file"
                                                    onChange={handleFileChange}
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
                                    <apan className="text-red-500">*</apan>
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={nombre}
                                        onChange={(ev) =>
                                            setNombre(ev.target.value)
                                        }
                                        id="name"
                                        name="name"
                                        type="text"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="categoria"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Categoria
                                    <apan className="text-red-500">*</apan>
                                </label>
                                <div className="mt-2">
                                    <select
                                        value={categoriaId}
                                        onChange={(ev) =>
                                            setCategoriaId(ev.target.value)
                                        }
                                        id="categoria"
                                        name="categoria"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    >
                                        <option value="" selected disabled>
                                            Seleccione una categoria
                                        </option>
                                        {categorias.map((category, index) => (
                                            <option
                                                key={index}
                                                value={category?.id}
                                            >
                                                {category?.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="orden"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Orden
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={orden}
                                        onChange={(ev) =>
                                            setOrden(ev.target.value)
                                        }
                                        id="orden"
                                        name="name"
                                        type="text"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full flex flex-row gap-2">
                                <input
                                    checked={destacado}
                                    onChange={(e) =>
                                        setDestacado(e.target.checked)
                                    }
                                    type="checkbox"
                                    name=""
                                    id="destacado"
                                />
                                <label
                                    htmlFor="destacado"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Seleccionar esta casilla si desea que este
                                    grupo de productos se muestre en el inicio
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </form>
            <div>
                <h2 className="text-2xl font-bold p-4">Grupos de productos</h2>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-center">
                            Imagenes de portada
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Nombre
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Categoria
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Orden
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Destacado
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Editar
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems?.map((grupo, index) => (
                        <GrupoDeProductoRow key={index} grupoObject={grupo} />
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center items-center py-4 gap-3 bg-gray-800 text-gray-400">
                <button
                    className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50 text-black"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Anterior
                </button>

                <span>
                    Página {currentPage} de {totalPages}
                </span>

                <button
                    className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50 text-black"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}
