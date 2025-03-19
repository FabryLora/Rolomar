import { ReactSummernoteLite } from "@easylogic/react-summernote-lite";
import { useEffect, useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function InformacionCarrito() {
    const { informacionCarrito, fetchInformacionCarrito } = useStateContext();

    const [info, setInfo] = useState(informacionCarrito?.informacion);
    const editorRef = useRef(null);

    useEffect(() => {
        setInfo(informacionCarrito?.informacion || "");
        if (editorRef.current && informacionCarrito?.informacion) {
            editorRef.current.summernote(
                "code",
                informacionCarrito?.informacion
            );
        }
    }, [informacionCarrito]);

    useEffect(() => {
        setInfo(informacionCarrito?.informacion);
    }, [informacionCarrito]);

    const handleUpload = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("informacion", editorRef.current.summernote("code"));

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
                <div className="col-span-full">
                    <label
                        htmlFor="about"
                        className="block text-sm/6 font-medium text-gray-900"
                    >
                        Texto
                    </label>
                    <style>
                        {`
                    .custom-container ul, 
                    .custom-container ol, 
                    .custom-container li, 
                    .custom-container h1, 
                    .custom-container h2, 
                    .custom-container h3, 
                    .custom-container h4, 
                    .custom-container h5, 
                    .custom-container h6 {
                        all: revert;
                    }
                    `}
                    </style>

                    <div className="custom-container mt-2 min-w-[900px] prose prose-sm sm:prose lg:prose-lg xl:prose-xl w-full max-w-full">
                        <ReactSummernoteLite
                            height={300}
                            className="w-full"
                            onInit={({ note }) => {
                                if (!editorRef.current) {
                                    editorRef.current = note; // Guarda la referencia del editor solo una vez

                                    if (info) {
                                        note.summernote("code", info);
                                    }
                                }
                            }}
                            tabsize={2}
                            toolbar={[
                                ["style", ["style"]],
                                [
                                    "font",
                                    [
                                        "bold",
                                        "underline",
                                        "clear",
                                        "strikethrough",
                                        "superscript",
                                        "subscript",
                                    ],
                                ],
                                ["fontsize", ["fontsize"]],
                                ["fontname", ["fontname"]],
                                ["color", ["color"]],
                                ["para", ["ul", "ol", "paragraph"]],
                                ["table", ["table"]],
                                ["insert", ["link", "picture", "video", "hr"]],
                                ["view", ["fullscreen", "codeview", "help"]],
                            ]}
                        />
                    </div>
                </div>
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
