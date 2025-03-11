import { AnimatePresence, motion } from "motion/react";
import { use, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function NovedadesRow({ novedadesObject }) {
    const { fetchNovedades } = useStateContext();
    const [editable, setEditable] = useState(false);

    // Precio
    const [image, setImage] = useState();
    const [title, setTitle] = useState(novedadesObject?.title);
    const [text, setText] = useState(novedadesObject?.text);
    const [featured, setFeatured] = useState(novedadesObject?.featured);
    const [type, setType] = useState(novedadesObject?.type);

    const handleFileChange = (e) => {
        setImage(e.target.files[0]); // Almacena los archivos seleccionados
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("type", type);
        formData.append("title", title);
        formData.append("text", text);
        formData.append("featured", featured);
        if (image) {
            formData.append("image", image);
        }

        const productResponse = axiosClient.post(
            `/novedades/${novedadesObject.id}?_method=PUT`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        toast.promise(productResponse, {
            loading: "Guardando...",
            success: "Guardado correctamente",
            error: "Error al guardar",
        });

        try {
            await productResponse;

            console.log("Producto e imágenes creadas:", productResponse);

            fetchNovedades();

            setEditable(false);
        } catch (error) {
            console.error("Error al crear el producto:", error);
        }
    };

    const deleteGroup = async () => {
        const res = axiosClient.delete(`/novedades/${novedadesObject.id}`);

        toast.promise(res, {
            loading: "Eliminando...",
            success: "Eliminado correctamente",
            error: "Error al eliminar",
        });

        try {
            await res;
            fetchNovedades();
        } catch (error) {
            console.error("Error al eliminar la novcedad:", error);
        }
    };

    return (
        <>
            <AnimatePresence>
                {editable && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50 text-black"
                    >
                        <div className="bg-white p-4 rounded-md w-[90%] max-w-[500px] overflow-y-auto scrollbar-hide max-h-[90vh]">
                            <h2 className="text-2xl font-bold">
                                Editar Novedad
                            </h2>
                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col gap-4"
                            >
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="type">Tipo</label>
                                    <input
                                        type="text"
                                        value={type}
                                        onChange={(e) =>
                                            setType(e.target.value)
                                        }
                                        id="type"
                                        className="border border-gray-300 rounded-md px-3 py-2"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="title">Título</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                        id="title"
                                        className="border border-gray-300 rounded-md px-3 py-2"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="text">Texto</label>
                                    <textarea
                                        value={text}
                                        onChange={(e) =>
                                            setText(e.target.value)
                                        }
                                        id="text"
                                        className="border border-gray-300 rounded-md px-3 py-2"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="image">Imagen</label>
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        id="image"
                                        className="border border-gray-300 rounded-md px-3 py-2"
                                    />
                                </div>
                                <div className="flex flex-row gap-2">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white py-2 px-6 rounded-md"
                                    >
                                        Guardar
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setEditable(false)}
                                        className="bg-red-500 text-white py-2 px-6 rounded-md"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <tr
                className={`text-black border-b  h-[134px] ${
                    novedadesObject?.id % 2 == 0 ? "bg-gray-200" : "bg-white"
                }`}
            >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white max-w-[340px] overflow-x-auto">
                    <div className="flex flex-row gap-2">
                        <div className="relative flex justify-between items-center h-[100px]">
                            <img
                                className="w-full h-full object-cover"
                                src={novedadesObject.image_url}
                                alt=""
                            />
                        </div>
                    </div>
                </td>

                <td className="px-6 py-4">
                    <p>{novedadesObject?.type}</p>
                </td>

                <td className="px-6 py-4">
                    <p>{novedadesObject?.title}</p>
                </td>

                <td className="px-6 py-4">
                    <p className="overflow-hidden max-w-[200px]">
                        {novedadesObject?.text}...
                    </p>
                </td>

                <td className="px-6 py-4 text-center">
                    <input
                        type="checkbox"
                        checked={featured == 1}
                        onChange={async (e) => {
                            const newValue = e.target.checked ? 1 : 0;
                            setFeatured(newValue);
                            const res = axiosClient.put(
                                `/novedades/${novedadesObject.id}`,
                                {
                                    featured: newValue,
                                }
                            );

                            toast.promise(res, {
                                loading: "Actualizando estado...",
                                success: "Estado actualizado",
                                error: "Error al actualizar el estado",
                            });

                            try {
                                await res;
                            } catch (error) {
                                console.error(
                                    "Error al actualizar el featured:",
                                    error
                                );
                            }
                        }}
                    />
                </td>

                <td>
                    <button
                        className="bg-blue-500 rounded-md text-white py-2 px-6"
                        onClick={() => setEditable(true)}
                    >
                        Editar
                    </button>
                </td>
            </tr>
        </>
    );
}
