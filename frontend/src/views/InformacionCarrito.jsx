import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function InformacionCarrito() {
    const { informacionCarrito, fetchInformacionCarrito } = useStateContext();

    const [info, setInfo] = useState(informacionCarrito?.informacion);

    useEffect(() => {
        setInfo(informacionCarrito?.informacion);
    }, [informacionCarrito]);

    const handleUpload = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("informacion", info);

        const response = axiosClient.post(
            "/informacion-carrito/1?_method=PUT",
            formData
        );

        toast.promise(response, {
            loading: "Guardando...",
            success: "Guardado correctamente",
            error: "Error al guardar",
        });

        try {
            await response;

            fetchInformacionCarrito();
        } catch (err) {
            console.error("Error al guardar:", err);
        }
    };

    return (
        <div className="px-6">
            <Toaster />
            <h1 className="text-2xl font-bold py-5">Información del carrito</h1>

            <form
                className="flex flex-col gap-3"
                method="POST"
                onSubmit={handleUpload}
            >
                <textarea
                    value={info}
                    onChange={(e) => setInfo(e.target.value)}
                    name="info"
                    id="info"
                    cols="30"
                    rows="10"
                    className="border border-gray-300 p-2 rounded-md"
                ></textarea>
                <div className=" flex items-center justify-end gap-x-6">
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    );
}
