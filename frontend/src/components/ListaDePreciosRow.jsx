import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function ListaDePreciosRow({ listaObject }) {
    const { fetchListadeprecios } = useStateContext();

    const [archivo, setArchivo] = useState();
    const [nombre, setNombre] = useState();
    const [updateView, setUpdateView] = useState(false);

    useEffect(() => {
        setNombre(listaObject?.nombre);
    }, [listaObject]);

    const downloadPDF = async () => {
        try {
            const filename = listaObject?.archivo_url.split("/").pop(); // Extraer solo el nombre del archivo

            const response = await axiosClient.get(
                `/downloadarchivo/${filename}`,
                {
                    responseType: "blob",
                }
            );

            const blob = new Blob([response.data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = listaObject?.nombre;
            document.body.appendChild(a);
            a.click();

            window.URL.revokeObjectURL(url);
            toast.success("Archivo descargado correctamente");
        } catch (error) {
            console.error("Error al descargar el PDF:", error);
            toast.error("Error al descargar el archivo");
        }
    };

    const update = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (archivo) {
            formData.append("archivo", archivo);
        }

        formData.append("nombre", nombre);

        try {
            const response = await axiosClient.post(
                `/listadeprecios/${listaObject.id}?_method=PUT`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            fetchListadeprecios();
            setUpdateView(false);
            toast.success("Archivo actualizado correctamente");
        } catch (err) {
            toast.error("Error al actualizar el archivo");
        }
    };
    console.log(listaObject);

    const deleteArchivo = async () => {
        try {
            const response = await axiosClient.post(
                `/listadeprecios/${listaObject?.id}?_method=DELETE`
            );
            console.log(response);
            fetchListadeprecios();
            toast.success("Archivo eliminado correctamente");
        } catch (error) {
            console.log(error);
            toast.error("Error al eliminar el archivo");
        }
    };

    return (
        <>
            <AnimatePresence>
                {updateView && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed top-0 left-0 bg-black text-black bg-opacity-50 w-screen h-screen flex items-center justify-center z-50"
                    >
                        <form
                            onSubmit={update}
                            className="p-4 flex flex-col w-[500px] border shadow-md gap-3 bg-white rounded-md"
                        >
                            <label htmlFor="nombre">Nombre del archivo</label>
                            <input
                                className="border pl-2 py-1"
                                type="text"
                                placeholder="Nombre del archivo"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                            <label htmlFor="archivo">Archivo</label>
                            <input
                                id="archivo"
                                type="file"
                                accept=""
                                onChange={(e) => setArchivo(e.target.files[0])}
                            />
                            <div className="flex flex-row border-t pt-5 justify-end">
                                <button
                                    onClick={() => setUpdateView(false)}
                                    type="button"
                                    className="bg-primary-red text-white px-3 py-2 rounded-md ml-2 hover:bg-red-600"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-primary-red text-white px-3 py-2 rounded-md ml-2 hover:bg-red-600"
                                >
                                    Actualizar Archivo
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
            <tr
                className={`border-gray-300 border-b h-[100px] text-black odd:bg-gray-100 even:bg-white`}
            >
                <td className="text-center">{listaObject?.nombre}</td>
                <td className="text-center">
                    <button
                        type="button"
                        onClick={downloadPDF}
                        className="text-blue-500"
                    >
                        Archivo
                    </button>
                </td>
                <td className="text-center">
                    <div className="flex flex-row gap-3 justify-center">
                        <button
                            onClick={() => setUpdateView(true)}
                            className="border-blue-500 border py-1 px-2 text-white rounded-md w-10 h-10"
                        >
                            <FontAwesomeIcon
                                icon={faPen}
                                size="lg"
                                color="#3b82f6"
                            />
                        </button>
                        <button
                            onClick={deleteArchivo}
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
            </tr>
        </>
    );
}
