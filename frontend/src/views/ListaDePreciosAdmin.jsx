import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axiosClient from "../axios";
import ListaDePreciosRow from "../components/ListaDePreciosRow";
import { useStateContext } from "../contexts/ContextProvider";

export default function ListaDePreciosAdmin() {
    const { fetchListadeprecios, listadeprecios } = useStateContext();

    const [archivo, setArchivo] = useState();
    const [nombre, setNombre] = useState();

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
            toast.success("Archivo subido correctamente");
        } catch (err) {
            toast.error("Error al subir el archivo");
        }
    };

    return (
        <div className="p-10 flex flex-col">
            <ToastContainer />
            <h1 className="text-2xl py-4">Crear nuevo campo de archivo</h1>
            <form
                onSubmit={handleUpload}
                className="p-4 flex flex-col w-[400px] border shadow-md gap-3"
            >
                <label htmlFor="nombre">Nombre del archivo</label>
                <input
                    className="border pl-2 py-1"
                    type="text"
                    placeholder="Nombre del archivo"
                    onChange={(e) => setNombre(e.target.value)}
                />
                <label htmlFor="archivo">Archivo</label>
                <input
                    id="archivo"
                    type="file"
                    accept=""
                    onChange={(e) => setArchivo(e.target.files[0])}
                />
                <div>
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-green-700"
                    >
                        Subir Archivo
                    </button>
                </div>
            </form>
            <h1 className="text-2xl py-4 pt-20">Campos de archivo</h1>
            <div className="w-full flex flex-row flex-wrap gap-4">
                {listadeprecios?.map((lista, index) => (
                    <ListaDePreciosRow key={index} listaObject={lista} />
                ))}
            </div>
        </div>
    );
}
