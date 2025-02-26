import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import fileRed from "../assets/iconos/pedido-icon.svg";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function ListadeproductosPrivadoRow({ archivoObject }) {
    const { fetchListadeprecios } = useStateContext();

    useEffect(() => {
        fetchListadeprecios();
    }, []);

    const [showViewer, setShowViewer] = useState(false);
    const downloadFile = async () => {
        try {
            const filename = archivoObject?.archivo_url.split("/").pop(); // Extraer el nombre del archivo

            const response = await axiosClient.get(
                `/downloadarchivo/${filename}`,
                {
                    responseType: "blob",
                }
            );

            // Obtener el tipo de archivo dinámicamente desde la respuesta
            const fileType =
                response.headers["content-type"] || "application/octet-stream";
            const blob = new Blob([response.data], { type: fileType });
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = filename; // Descargar con el nombre original
            document.body.appendChild(a);
            a.click();

            window.URL.revokeObjectURL(url);
            toast.success("Archivo descargado correctamente");
        } catch (error) {
            console.error("Error al descargar el archivo:", error);
            toast.error("Error al descargar el archivo");
        }
    };

    return (
        <tr className="h-[100px]">
            <td className="py-2">
                <div className="flex items-center justify-center w-[80px] h-[80px] bg-[#F5F5F5]">
                    <img src={fileRed} alt="" />
                </div>
            </td>
            <td>{archivoObject?.nombre}</td>
            <td>
                {archivoObject?.formato?.split("/")[1].toUpperCase() ||
                    "Desconocido"}
            </td>
            <td>
                {archivoObject?.peso
                    ? `${(archivoObject.peso / 1024).toFixed(2)} KB`
                    : "Desconocido"}
            </td>
            <td className="w-[500px]">
                <button
                    onClick={() =>
                        window.open(archivoObject?.archivo_url, "_blank")
                    }
                    className="border mx-6 border-primary-red text-primary-red w-[184px] h-[47px] hover:text-white hover:bg-primary-red"
                >
                    VER ONLINE
                </button>

                <button
                    type="button"
                    onClick={downloadFile}
                    className="bg-primary-red text-white h-[47px] w-[184px] hover:text-primary-red hover:bg-white hover:border-primary-red hover:border"
                >
                    DESCARGAR
                </button>
            </td>

            {/* Modal para mostrar el archivo */}
            {showViewer && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-5 rounded-lg max-w-3xl w-full">
                        <button
                            onClick={() => setShowViewer(false)}
                            className="float-right text-red-500"
                        >
                            ✖ Cerrar
                        </button>
                        {archivoObject?.formato?.includes("image") ? (
                            <img
                                src={archivoObject.archivo_url}
                                alt="Archivo"
                                className="w-full max-h-[80vh] object-contain"
                            />
                        ) : (
                            <iframe
                                src={archivoObject.archivo_url}
                                className="w-full h-[500px]"
                            ></iframe>
                        )}
                    </div>
                </div>
            )}
        </tr>
    );
}
