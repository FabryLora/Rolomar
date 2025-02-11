import { ReactSummernoteLite } from "@easylogic/react-summernote-lite";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function NosotrosInicioAdmin() {
    const { nosotrosInicio, fetchNosotrosInicio } = useStateContext();

    const [text, setText] = useState();
    const [image, setImage] = useState();

    const editorRef = useRef(null);

    useEffect(() => {
        fetchNosotrosInicio();
    }, []);

    useEffect(() => {
        setText(nosotrosInicio?.text || "");
        if (editorRef.current && nosotrosInicio?.text) {
            editorRef.current.summernote("code", nosotrosInicio?.text);
        }
    }, [nosotrosInicio]);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const update = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("text", editorRef.current.summernote("code"));
        if (image !== undefined) {
            formData.append("image", image);
        }

        try {
            await axiosClient.post(`/nosotrosinicio/1?_method=PUT`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            fetchNosotrosInicio();
            toast.success("Guardado correctamente");
        } catch (err) {
            toast.error("Error al guardar");
        }
    };

    return (
        <div className="">
            <ToastContainer />
            <form
                onSubmit={update}
                className="p-5 flex flex-col justify-between h-screen"
            >
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                                <label
                                    htmlFor="about"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Texto
                                </label>
                                <style>
                                    {`
                                    .custom-container ul, ol, li, h1, h2, h3,h4,h5,h6 {
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
                                <label
                                    htmlFor="cover-photo"
                                    className="block font-medium text-gray-900 text-xl"
                                >
                                    Imagen
                                </label>
                                <div className="mt-2 flex justify-between rounded-lg border border-dashed border-gray-900/25 ">
                                    <div className=" w-1/2 h-[300px]">
                                        <img
                                            className="w-full h-full object-contain"
                                            src={nosotrosInicio?.image_url}
                                            alt=""
                                        />
                                    </div>
                                    <div className="flex items-center justify-center w-1/2">
                                        <div className="text-center items-center h-fit self-center">
                                            <div className="mt-4 flex text-sm/6 text-gray-600">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                >
                                                    <span>Cambiar Imagen</span>
                                                    <input
                                                        id="file-upload"
                                                        name="file-upload"
                                                        onChange={
                                                            handleImageChange
                                                        }
                                                        type="file"
                                                        className="sr-only"
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6 pb-10">
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Actualizar
                    </button>
                </div>
            </form>
        </div>
    );
}
