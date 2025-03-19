import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Switch from "@mui/material/Switch";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
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

        const grupoData = new FormData();

        grupoData.append("nombre", nombre);

        if (orden) {
            grupoData.append("orden", orden);
        }

        grupoData.append("categoria_id", categoriaId);

        // 1. Crear el producto
        const grupoResponse = axiosClient.post(
            `/grupo-de-productos/${grupoObject?.id}?_method=PUT`,
            grupoData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        try {
            if (imagen) {
                const imagenData = new FormData();
                imagenData.append("image", imagen);
                imagenData.append("grupo_de_productos_id", grupoObject?.id);

                const imagenResponse = axiosClient.post(
                    `/grupo-images`,
                    imagenData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
            }
            await grupoResponse;
            toast.success("Guardado correctamente");
            console.log(grupoResponse);
            setEditar(false);
            fetchGrupoDeProductos(true);
        } catch (err) {
            toast.error("Error al guardar");
            console.error("Error al guardar:", err);
        }
    };

    const deleteGrupo = async () => {
        const response = axiosClient.post(
            `/grupo-de-productos/${grupoObject?.id}?_method=DELETE`
        );

        toast.promise(response, {
            loading: "Eliminando...",
            success: "Eliminado correctamente",
            error: "Error al eliminar",
        });

        try {
            await response;

            fetchGrupoDeProductos(true);
        } catch (err) {
            console.error("Error al eliminar:", err);
        }
    };

    const deleteImage = async (imageId) => {
        const response = axiosClient.post(
            `/grupo-images/${imageId}?_method=DELETE`
        );

        toast.promise(response, {
            loading: "Eliminando...",
            success: "Eliminado correctamente",
            error: "Error al eliminar",
        });

        try {
            await response;

            fetchGrupoDeProductos();
        } catch (err) {
            console.error("Error al eliminar:", err);
        }
    };

    const handleChange = (event) => {
        setDestacado(event.target.checked);
        const grupoData = new FormData();
        grupoData.append("destacado", event.target.checked ? 1 : 0);
        axiosClient.post(
            `/grupo-de-productos/${grupoObject?.id}?_method=PUT`,
            grupoData
        );
    };

    return (
        <tr
            className={`border-gray-300 border-b text-black h-[134px] odd:bg-gray-100 even:bg-white`}
        >
            <td className="text-center">{grupoObject?.orden}</td>
            <td className="text-center">{grupoObject?.nombre}</td>
            <td className="text-center">
                {
                    categorias?.find(
                        (categoria) =>
                            categoria?.id === Number(grupoObject?.categoria_id)
                    )?.nombre
                }
            </td>

            <td className="text-center h-[100px]">
                {grupoObject?.images?.length > 0 ? (
                    <div className="flex flex-row gap-2 justify-center">
                        {grupoObject?.images?.map((image, index) => (
                            <div className="relative h-[100px]" key={index}>
                                <div
                                    onClick={() => deleteImage(image?.id)}
                                    className="cursor-pointer flex items-center justify-center bg-black bg-opacity-50 absolute w-full h-full"
                                >
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        color="#ef4444"
                                        size="xl"
                                    />
                                </div>
                                <img
                                    className="w-full h-full object-contain px-4 py-2"
                                    src={image?.image_url}
                                    alt=""
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Sin imagen</p>
                )}
            </td>
            <td className="text-center">
                <Switch
                    checked={destacado}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "controlled" }}
                />
            </td>
            <td className="text-center">
                <div className="flex flex-row gap-3 justify-center">
                    <button
                        onClick={() => setEditar(true)}
                        className="border-blue-500 border py-1 px-2 text-white rounded-md w-10 h-10"
                    >
                        <FontAwesomeIcon
                            icon={faPen}
                            size="lg"
                            color="#3b82f6"
                        />
                    </button>
                    <button
                        onClick={deleteGrupo}
                        className="border-primary-red border py-1 px-2 text-white rounded-md w-10 h-10"
                    >
                        <FontAwesomeIcon
                            icon={faTrash}
                            size="lg"
                            color="#bc1d31"
                        />
                    </button>
                </div>
            </td>
            <AnimatePresence>
                {editar && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
                    >
                        <form
                            onSubmit={update}
                            className="text-black "
                            method="POST"
                        >
                            <div className="bg-white p-4 w-[500px] rounded-md">
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
                                        onChange={(e) =>
                                            setNombre(e.target.value)
                                        }
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
                                            Elegir imagen a agregar
                                        </label>
                                        <p>{imagen?.name}</p>
                                    </div>

                                    <label htmlFor="ordenn">Orden</label>
                                    <input
                                        className="border border-gray-300 p-2 rounded-md"
                                        type="text"
                                        name="ordenn"
                                        id="ordenn"
                                        value={orden}
                                        onChange={(e) =>
                                            setOrden(e.target.value)
                                        }
                                    />

                                    <label htmlFor="categoriaa">
                                        Categoría
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        className="border border-gray-300 p-2 rounded-md"
                                        name="categoriaa"
                                        id="categoriaa"
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
                                            type="button"
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
                    </motion.div>
                )}
            </AnimatePresence>
        </tr>
    );
}
