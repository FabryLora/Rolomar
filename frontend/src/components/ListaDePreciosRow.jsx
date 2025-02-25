import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function ListaDePreciosRow({ listaObject }) {
    const { fetchListadeprecios } = useStateContext();

    const [archivo, setArchivo] = useState();
    const [nombre, setNombre] = useState();

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
            toast.success("Archivo actualizado correctamente");
        } catch (err) {
            toast.error("Error al actualizar el archivo");
        }
    };

    const deleteArchivo = async () => {
        try {
            const response = await axiosClient.post(
                `/listadeprecios/${listaObject.id}?_method=DELETE`
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
        <form
            onSubmit={update}
            className="p-4 flex flex-col w-[500px] border shadow-md gap-3"
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
            <div className="flex flex-row border-t pt-5">
                <button
                    type="submit"
                    className="bg-green-500 text-white px-3 py-2 rounded-md ml-2 hover:bg-green-700"
                >
                    Actualizar Archivo
                </button>
                <button
                    type="button"
                    onClick={downloadPDF}
                    className="bg-blue-500 text-white px-3 py-2 rounded-md ml-2 hover:bg-blue-700"
                >
                    Descargar Archivo
                </button>
                <button
                    type="button"
                    onClick={deleteArchivo}
                    className="bg-red-500 text-white px-3 py-2 rounded-md ml-2 hover:bg-red-700"
                >
                    Eliminar Campo
                </button>
            </div>
        </form>
    );
}
