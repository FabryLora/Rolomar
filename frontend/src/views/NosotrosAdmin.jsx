import { ReactSummernoteLite } from "@easylogic/react-summernote-lite";
import { useEffect, useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function NosotrosAdmin() {
    const { nosotros, fetchNosotros } = useStateContext();
    const [image, setImage] = useState();
    const [text, setText] = useState();
    const [mision, setMision] = useState();
    const [vision, setVision] = useState();
    const [valores, setValores] = useState();

    const editorRef = useRef(null); // Referencia al editor

    useEffect(() => {
        fetchNosotros();
    }, []);

    useEffect(() => {
        setText(nosotros?.text);
        setMision(nosotros?.mision);
        setVision(nosotros?.vision);
        setValores(nosotros?.valores);

        // Si el editor está inicializado, actualiza el contenido
        if (editorRef.current && nosotros?.text) {
            editorRef.current.summernote("code", nosotros?.text);
        }
    }, [nosotros]);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const update = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        // Obtiene el contenido del editor antes de enviar

        if (image) {
            formData.append("image", image);
        }

        formData.append("text", editorRef.current.summernote("code"));
        formData.append("mision", mision);
        formData.append("vision", vision);
        formData.append("valores", valores);

        const res = axiosClient.post("/nosotros/1?_method=PUT", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        toast.promise(res, {
            loading: "Actualizando...",
            success: "Actualizado correctamente",
            error: "Error al actualizar",
        });

        try {
            await res;

            fetchNosotros();
        } catch (error) {
            console.error("Error al guardar:", error);
        }
    };

    return (
        <div>
            <Toaster />
            <form
                onSubmit={update}
                className="p-5 flex flex-col justify-between h-screen"
            >
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                                <label className="block text-sm/6 font-medium text-gray-900">
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
                                        className="w-full"
                                        onInit={({ note }) => {
                                            if (!editorRef.current) {
                                                editorRef.current = note; // Guarda la referencia del editor solo una vez

                                                if (text) {
                                                    note.summernote(
                                                        "code",
                                                        text
                                                    );
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
                                            [
                                                "insert",
                                                [
                                                    "link",
                                                    "picture",
                                                    "video",
                                                    "hr",
                                                ],
                                            ],
                                            [
                                                "view",
                                                [
                                                    "fullscreen",
                                                    "codeview",
                                                    "help",
                                                ],
                                            ],
                                        ]}
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label className="block font-medium text-gray-900 text-xl">
                                    Imagen
                                </label>
                                <div className="mt-2 flex justify-between rounded-lg border border-dashed border-gray-900/25">
                                    <div className="w-1/2 h-[200px]">
                                        <img
                                            className="w-full h-full object-contain"
                                            src={nosotros?.image_url}
                                            alt=""
                                        />
                                    </div>
                                    <div className="flex items-center justify-center w-1/2">
                                        <div className="text-center items-center h-fit self-center">
                                            <div className="mt-4 flex text-sm flex-col gap-2 text-gray-600">
                                                <label className="cursor-pointer rounded-md bg-white font-semibold text-indigo-600 hover:text-indigo-500">
                                                    <span>Cambiar Imagen</span>

                                                    <input
                                                        type="file"
                                                        onChange={
                                                            handleImageChange
                                                        }
                                                        className="sr-only"
                                                    />
                                                </label>
                                                <p>{image && image?.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="mision"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Mision
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        value={mision}
                                        onChange={(e) =>
                                            setMision(e.target.value)
                                        }
                                        id="mision"
                                        name="mision"
                                        rows={4}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="vision"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Vision
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        value={vision}
                                        onChange={(e) =>
                                            setVision(e.target.value)
                                        }
                                        id="vision"
                                        name="vision"
                                        rows={4}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="sustentabilidad"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Valores
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        value={valores}
                                        onChange={(e) =>
                                            setValores(e.target.value)
                                        }
                                        id="sustentabilidad"
                                        name="sustentabilidad"
                                        rows={4}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6 pb-10">
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                    >
                        Actualizar
                    </button>
                </div>
            </form>
        </div>
    );
}
