import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function CategoryAdminCard({ category }) {
    const { fetchCategorias } = useStateContext();

    const [imagen, setImagen] = useState();
    const [nombre, setNombre] = useState(category?.nombre);
    const [orden, setOrden] = useState(category?.orden);
    const [edit, setEdit] = useState(false);

    const hanldeFileChange = (e) => {
        setImagen(e.target.files[0]);
    };

    const update = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (imagen) {
            formData.append("imagen", imagen);
        }
        formData.append("nombre", nombre);
        formData.append("orden", orden);

        const response = axiosClient.post(
            `/categorias/${category?.id}?_method=PUT`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        toast.promise(response, {
            loading: "Actualizando...",
            success: "Actualizado correctamente",
            error: "Error al actualizar",
        });

        try {
            await response;
            console.log(response);
            fetchCategorias(true);
            setEdit(false);
        } catch (error) {
            console.error("Error al guardar:", error);
        }
    };

    const deleteCategory = async () => {
        const response = axiosClient.delete(`/categorias/${category?.id}`);

        toast.promise(response, {
            loading: "Eliminando...",
            success: "Eliminado correctamente",
            error: "Error al eliminar",
        });

        try {
            await response;
            console.log(response);
            fetchCategorias(true);
        } catch (error) {
            console.error("Error al eliminar:", error);
        }
    };

    return (
        <tr className={`border text-black odd:bg-gray-100 even:bg-white`}>
            <td className=" align-middle">{orden}</td>
            <td className=" align-middle pl-3">{nombre}</td>
            <td className=" w-[90px] h-[90px] px-8">
                <img
                    className="w-full h-full object-contain"
                    src={category?.imagen_url}
                    alt=""
                />
            </td>

            <td className="text-center w-[140px]">
                <div className="flex flex-row gap-3 justify-center">
                    <button
                        onClick={() => setEdit(true)}
                        className="border-blue-500 border py-1 px-2 text-white rounded-md w-10 h-10"
                    >
                        <FontAwesomeIcon
                            icon={faPen}
                            size="lg"
                            color="#3b82f6"
                        />
                    </button>
                    <button
                        onClick={deleteCategory}
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
                {edit && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50 text-left"
                    >
                        <form onSubmit={update} className="text-black">
                            <div className="bg-white p-4 w-[500px] rounded-md">
                                <h2 className="text-2xl font-semibold mb-4">
                                    Editar categoria
                                </h2>
                                <div className="flex flex-col gap-4">
                                    <label htmlFor="imagen">Imagen</label>
                                    <div className="flex flex-row">
                                        <input
                                            type="file"
                                            name="imagen"
                                            id="imagenedit"
                                            onChange={hanldeFileChange}
                                            className="hidden"
                                        />
                                        <label
                                            className="cursor-pointer bg-indigo-500 rounded-md text-white py-1 px-2"
                                            htmlFor="imagenedit"
                                        >
                                            Elegir imagen
                                        </label>
                                        <p>{imagen?.name}</p>
                                    </div>
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

                                    <div className="flex justify-end gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setEdit(false)}
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
        </tr>
    );
}
