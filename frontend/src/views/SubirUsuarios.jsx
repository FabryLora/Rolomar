import { useState } from "react";
import axiosClient from "../axios";

const SubirUsuarios = () => {
    const [file, setFile] = useState(null);
    const [mensaje, setMensaje] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setMensaje("Selecciona un archivo primero.");
            return;
        }

        const formData = new FormData();
        formData.append("archivo", file);

        try {
            const response = await axiosClient.post(
                "/importar-usuarios",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setMensaje(response.data.message);
        } catch (error) {
            setMensaje("Error al subir el archivo.");
            console.error(error);
        }
    };

    return (
        <div className="p-4 border rounded-md shadow-lg">
            <h2 className="text-lg font-bold mb-2">Importar usuarios</h2>
            <input type="file" onChange={handleFileChange} className="mb-2" />
            <button
                onClick={handleUpload}
                className="px-4 py-2 bg-blue-500 text-white rounded"
            >
                Subir Archivo
            </button>
            {mensaje && <p className="mt-2 text-sm">{mensaje}</p>}
        </div>
    );
};

export default SubirUsuarios;
