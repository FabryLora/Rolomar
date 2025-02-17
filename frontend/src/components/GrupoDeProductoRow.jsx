import { useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function GrupoDeProductoRow({ grupoObject }) {
    const { categorias, fetchGrupoDeProductos } = useStateContext();
    const [editar, setEditar] = useState(false);

    const [nombre, setNombre] = useState(grupoObject?.nombre);
    const [imagen, setImagen] = useState();
    const [destacado, setDestacado] = useState(grupoObject?.destacado);
    const [orden, setOrden] = useState(grupoObject?.orden);
    const [categoriaId, setCategoriaId] = useState(grupoObject?.categoria_id);

    const handleFileChange = (e) => {
        setImagen(e.target.files[0]);
    };

    const update = async (e) => {
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
                `/grupo-de-productos/${grupoObject?.id}?_method=PUT`,
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

    const deleteGrupo = async () => {
        try {
            await axiosClient.post(
                `/grupo-de-productos/${grupoObject?.id}?_method=DELETE`
            );
            toast.success("Eliminado correctamente");
            fetchGrupoDeProductos();
        } catch (err) {
            toast.error("Error al eliminar");
        }
    };

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 h-[134px]">
            <td className="text-center h-[100px]">
                {grupoObject?.imagen_url ? (
                    <img
                        className="w-full h-full object-contain"
                        src={grupoObject?.imagen_url}
                        alt=""
                    />
                ) : (
                    <p>Sin imagen</p>
                )}
            </td>
            <td className="text-center">{grupoObject?.nombre}</td>
            <td className="text-center">
                {
                    categorias?.find(
                        (categoria) =>
                            categoria?.id === Number(grupoObject?.categoria_id)
                    )?.nombre
                }
            </td>
            <td className="text-center">{grupoObject?.orden}</td>
            <td className="text-center">
                <input
                    type="checkbox"
                    name=""
                    checked={grupoObject?.destacado}
                    disabled
                    id=""
                />
            </td>
            <td className="text-center">
                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => setEditar(true)}
                        className="bg-blue-500 py-1 px-2 text-white rounded-md"
                    >
                        Editar
                    </button>
                    <button
                        onClick={deleteGrupo}
                        className="bg-primary-red py-1 px-2 text-white rounded-md"
                    >
                        Eliminar
                    </button>
                </div>
            </td>
            {editar && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <form
                        onSubmit={update}
                        className="text-black"
                        method="POST"
                    >
                        <div className="bg-white p-4 w-[500px]">
                            <h2 className="text-2xl font-semibold mb-4">
                                Editar grupo de producto
                            </h2>
                            <div className="flex flex-col gap-4">
                                <label htmlFor="nombre">
                                    Nombre{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    className="border border-gray-300 p-2 rounded-md"
                                    type="text"
                                    name="nombre"
                                    id="nombre"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                />
                                <label htmlFor="imagen">Imagen</label>
                                <div className="flex flex-row">
                                    <input
                                        type="file"
                                        name="imagen"
                                        id="imagen"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                    <label
                                        className="cursor-pointer bg-indigo-500 rounded-md text-white py-1 px-2"
                                        htmlFor="imagen"
                                    >
                                        Elegir imagen
                                    </label>
                                    <p>{imagen?.name}</p>
                                </div>

                                <label htmlFor="orden">Orden</label>
                                <input
                                    className="border border-gray-300 p-2 rounded-md"
                                    type="text"
                                    name="orden"
                                    id="orden"
                                    value={orden}
                                    onChange={(e) => setOrden(e.target.value)}
                                />
                                <label htmlFor="destacado">Destacado</label>
                                <div className="flex flex-row gap-2">
                                    <input
                                        type="checkbox"
                                        name="destacado"
                                        id="destacado"
                                        checked={destacado}
                                        onChange={(e) =>
                                            setDestacado(e.target.checked)
                                        }
                                    />
                                    <label htmlFor="destacado">
                                        Selecciona esta casilla si deseas que el
                                        grupo se muestre en el inicio
                                    </label>
                                </div>

                                <label htmlFor="categoria">
                                    Categoría
                                    <span className="text-red-500">*</span>
                                </label>
                                <select
                                    className="border border-gray-300 p-2 rounded-md"
                                    name="categoria"
                                    id="categoria"
                                    value={categoriaId}
                                    onChange={(e) =>
                                        setCategoriaId(e.target.value)
                                    }
                                >
                                    {categorias?.map((categoria) => (
                                        <option
                                            key={categoria?.id}
                                            value={categoria?.id}
                                        >
                                            {categoria?.nombre}
                                        </option>
                                    ))}
                                </select>
                                <div className="flex justify-end gap-4">
                                    <button
                                        onClick={() => setEditar(false)}
                                        className="bg-primary-red py-1 px-2 text-white rounded-md"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={update}
                                        className="bg-blue-500 py-1 px-2 text-white rounded-md"
                                    >
                                        Guardar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </tr>
    );
}
