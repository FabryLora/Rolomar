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
    const [titleMision, setTitleMision] = useState();
    const [titleVision, setTitleVision] = useState();
    const [titleValores, setTitleValores] = useState();
    const [title, setTitle] = useState();

    const editorRefs = useRef({});

    useEffect(() => {
        fetchNosotros();
    }, []);

    useEffect(() => {
        setText(nosotros?.text);
        setMision(nosotros?.mision);
        setVision(nosotros?.vision);
        setValores(nosotros?.valores);
        setTitle(nosotros?.title);
        setTitleMision(nosotros?.title_mision);
        setTitleVision(nosotros?.title_vision);
        setTitleValores(nosotros?.title_valores);

        // Si el editor está inicializado, actualiza el contenido
        if (editorRefs.current.text && nosotros?.text) {
            editorRefs.current.text.summernote("code", nosotros.text);
        }
        if (editorRefs.current.mision && nosotros?.mision) {
            editorRefs.current.mision.summernote("code", nosotros.mision);
        }
        if (editorRefs.current.vision && nosotros?.vision) {
            editorRefs.current.vision.summernote("code", nosotros.vision);
        }
        if (editorRefs.current.valores && nosotros?.valores) {
            editorRefs.current.valores.summernote("code", nosotros.valores);
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

        formData.append(
            "text",
            editorRefs.current.text?.summernote("code") || ""
        );
        formData.append("title", title);
        formData.append("title_mision", titleMision);
        formData.append("title_vision", titleVision);
        formData.append("title_valores", titleValores);
        formData.append(
            "mision",
            editorRefs.current.mision?.summernote("code") || ""
        );
        formData.append(
            "vision",
            editorRefs.current.vision?.summernote("code") || ""
        );
        formData.append(
            "valores",
            editorRefs.current.valores?.summernote("code") || ""
        );

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
                        <div className="flex flex-col gap-10">
                            <div className="col-span-full">
                                <label
                                    htmlFor="titu"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Titutlo
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                        id="titu"
                                        name="titu"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

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
                                        height={200}
                                        className="w-full"
                                        onInit={({ note }) => {
                                            editorRefs.current.text = note;
                                            if (text) {
                                                note.summernote("code", text);
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
                                <p>Resolucion recomendada: 184px * 141px</p>
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
                                                <label className="cursor-pointer rounded-md bg-primary-red font-semibold text-white py-1 px-2">
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
                            <div className="flex flex-row justify-between w-full gap-5">
                                <div className="w-full">
                                    <input
                                        value={titleMision}
                                        onChange={(e) =>
                                            setTitleMision(e.target.value)
                                        }
                                        type="text"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400"
                                    />
                                    <div className="custom-container mt-2  prose prose-sm sm:prose lg:prose-lg xl:prose-xl w-full max-w-full">
                                        <ReactSummernoteLite
                                            height={200}
                                            className="w-full"
                                            onInit={({ note }) => {
                                                editorRefs.current.mision =
                                                    note;
                                                if (mision) {
                                                    note.summernote(
                                                        "code",
                                                        mision
                                                    );
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
                                                    ],
                                                ],
                                                ["fontsize", ["fontsize"]],
                                                ["fontname", ["fontname"]],
                                                ["color", ["color"]],
                                                [
                                                    "para",
                                                    ["ul", "ol", "paragraph"],
                                                ],
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

                                <div className="w-full">
                                    <input
                                        value={titleVision}
                                        onChange={(e) =>
                                            setTitleVision(e.target.value)
                                        }
                                        type="text"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400"
                                    />
                                    <div className="custom-container mt-2  prose prose-sm sm:prose lg:prose-lg xl:prose-xl w-full max-w-full">
                                        <ReactSummernoteLite
                                            height={200}
                                            className="w-full"
                                            onInit={({ note }) => {
                                                editorRefs.current.vision =
                                                    note;
                                                if (vision) {
                                                    note.summernote(
                                                        "code",
                                                        vision
                                                    );
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
                                                [
                                                    "para",
                                                    ["ul", "ol", "paragraph"],
                                                ],
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

                                <div className="w-full">
                                    <input
                                        value={titleValores}
                                        onChange={(e) =>
                                            setTitleValores(e.target.value)
                                        }
                                        type="text"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400"
                                    />
                                    <div className="custom-container mt-2  prose prose-sm sm:prose lg:prose-lg xl:prose-xl w-full max-w-full">
                                        <ReactSummernoteLite
                                            height={200}
                                            className="w-full"
                                            onInit={({ note }) => {
                                                editorRefs.current.valores =
                                                    note;
                                                if (valores) {
                                                    note.summernote(
                                                        "code",
                                                        valores
                                                    );
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
                                                [
                                                    "para",
                                                    ["ul", "ol", "paragraph"],
                                                ],
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
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6 pb-10">
                    <button
                        type="submit"
                        className="rounded-md bg-primary-red px-3 py-2 text-sm font-semibold text-white shadow-sm "
                    >
                        Actualizar
                    </button>
                </div>
            </form>
        </div>
    );
}
