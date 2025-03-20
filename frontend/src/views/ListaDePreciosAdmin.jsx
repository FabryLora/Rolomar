import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axiosClient from "../axios";
import ListaDePreciosRow from "../components/ListaDePreciosRow";
import { useStateContext } from "../contexts/ContextProvider";

export default function ListaDePreciosAdmin() {
    const { fetchListadeprecios, listadeprecios } = useStateContext();

    const [archivo, setArchivo] = useState();
    const [nombre, setNombre] = useState();
    const [createView, setCreateView] = useState(false);

    const handleUpload = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("archivo", archivo);
        formData.append("nombre", nombre);

        try {
            const response = await axiosClient.post(
                "/listadeprecios",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            fetchListadeprecios();
            setCreateView(false);
            toast.success("Archivo subido correctamente");
        } catch (err) {
            toast.error("Error al subir el archivo");
        }
    };

    return (
        <div className="pt-10 px-6 flex flex-col">
            <Toaster />
            <AnimatePresence>
                {createView && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50"
                    >
                        <form
                            onSubmit={handleUpload}
                            className="p-4 flex flex-col w-[400px] border shadow-md gap-3 bg-white rounded-md"
                        >
                            <h1 className="text-2xl py-4 border-b">
                                Crear nuevo campo de archivo
                            </h1>
                            <label htmlFor="nombre">Nombre del archivo</label>
                            <input
                                className="border pl-2 py-1"
                                type="text"
                                placeholder="Nombre del archivo"
                                onChange={(e) => setNombre(e.target.value)}
                            />
                            <label htmlFor="archivo">Archivo</label>
                            <input
                                className="pb-10"
                                id="archivo"
                                type="file"
                                accept=""
                                onChange={(e) => setArchivo(e.target.files[0])}
                            />
                            <div className="flex flex-row justify-end">
                                <button
                                    type="button"
                                    onClick={() => setCreateView(false)}
                                    className="bg-primary-red text-white px-2 py-1 rounded-md ml-2 hover:bg-red-800"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="bg-primary-red text-white px-2 py-1 rounded-md ml-2 hover:bg-red-800"
                                >
                                    Subir Archivo
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="flex flex-row justify-between items-center">
                <h1 className="text-2xl font-bold py-2 ">Lista de Precios</h1>
                <button
                    onClick={() => setCreateView(true)}
                    className="text-white bg-primary-red py-1 px-2 rounded-md h-fit"
                >
                    Crear Campo
                </button>
            </div>

            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border">
                <thead className="  font-inter  text-black bg-gray-300 uppercase">
                    <tr className="">
                        <th
                            scope="col"
                            className="px-6 py-3 text-center font-medium"
                        >
                            Nombre
                        </th>

                        <th
                            scope="col"
                            className="px-6 py-3 text-center font-medium"
                        >
                            Archivo
                        </th>

                        <th
                            scope="col"
                            className="px-6 py-3 text-center font-medium"
                        >
                            Editar
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {listadeprecios?.map((listadeprecio) => (
                        <ListaDePreciosRow
                            key={listadeprecio?.id}
                            listaObject={listadeprecio}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
