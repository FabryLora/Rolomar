import { ReactSummernoteLite } from "@easylogic/react-summernote-lite";
import { useEffect, useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function Contenido() {
    const {
        logos,
        fetchLogos,
        nosotrosInicio,
        fetchNosotrosInicio,
        brandImages,
        fetchBrandImages,
    } = useStateContext();

    const [principal, setPrincipal] = useState();
    const [secundario, setSecundario] = useState();
    //nosotros inicio
    const [text, setText] = useState();
    const [image, setImage] = useState();
    const [title, setTitle] = useState();
    const [imageMarcas, setImageMarcas] = useState();
    const editorRef = useRef(null);
    useEffect(() => {
        fetchNosotrosInicio();
    }, []);

    useEffect(() => {
        setText(nosotrosInicio?.text || "");
        setTitle(nosotrosInicio?.title || "");
        if (editorRef.current && nosotrosInicio?.text) {
            editorRef.current.summernote("code", nosotrosInicio?.text);
        }
    }, [nosotrosInicio]);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const updateAll = async (e) => {
        e.preventDefault();

        try {
            if (principal || secundario) {
                const formDataLogos = new FormData();
                if (principal) formDataLogos.append("principal", principal);
                if (secundario) formDataLogos.append("secundario", secundario);
                await axiosClient.post(`/logos/1?_method=PUT`, formDataLogos, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                fetchLogos();
            }

            if (
                title !== nosotrosInicio?.title ||
                editorRef.current.summernote("code") !== nosotrosInicio?.text ||
                image
            ) {
                const formDataNosotros = new FormData();
                formDataNosotros.append("title", title);
                formDataNosotros.append(
                    "text",
                    editorRef.current.summernote("code")
                );
                if (image) formDataNosotros.append("image", image);
                await axiosClient.post(
                    `/nosotrosinicio/1?_method=PUT`,
                    formDataNosotros,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                );
                fetchNosotrosInicio();
            }

            toast.success("Guardado correctamente");
        } catch (err) {
            toast.error("Error al guardar");
        }
    };

    const deleteImage = async (id) => {
        const deleteImage = axiosClient.delete(`/brandimages/${id}`);

        toast.promise(deleteImage, {
            loading: "Eliminando imagen...",
            success: "Imagen eliminada correctamente",
            error: "Error al eliminar imagen",
        });

        try {
            await deleteImage;
            fetchBrandImages();
        } catch (err) {
            console.error("Error en la eliminación:", err);
        }
    };

    const addImage = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", imageMarcas);

        const updateLogos = axiosClient.post(`/brandimages`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        toast.promise(updateLogos, {
            loading: "Agregando imagen...",
            success: "Imagen agregada correctamente",
            error: "Error al agregar imagen",
        });

        try {
            await updateLogos;
            fetchBrandImages();
        } catch (err) {
            console.error("Error en la actualización:", err);
        }
    };

    return (
        <div className="">
            <Toaster />
            <form
                onSubmit={updateAll}
                className="p-5 flex flex-col justify-between h-fit"
            >
                <div className="w-full">
                    <div className=" border-gray-900/10 pb-12">
                        <h2 className="text-3xl border-b-2 pb-2">Logos</h2>
                        <div className="flex flex-row justify-between gap-5 pt-5">
                            <div className="w-full">
                                <label
                                    htmlFor="logoprincipal"
                                    className="block font-medium text-gray-900 text-xl"
                                >
                                    Logo Principal
                                </label>
                                <div className="mt-2 flex justify-between rounded-lg border shadow-lg">
                                    <div className=" w-1/2 h-[200px] bg-[rgba(0,0,0,0.2)] py-4">
                                        <img
                                            className="w-full h-full object-contain"
                                            src={logos?.principal_url}
                                            alt=""
                                        />
                                    </div>
                                    <div className="flex items-center justify-center w-1/2">
                                        <div className="text-center items-center h-fit self-center">
                                            <div className="mt-4 flex flex-col text-sm/6 text-gray-600">
                                                <label
                                                    htmlFor="logoprincipal"
                                                    className="relative cursor-pointer rounded-md  font-semibold bg-primary-red  text-white py-1 px-2"
                                                >
                                                    <span>Cambiar Imagen</span>
                                                    <input
                                                        id="logoprincipal"
                                                        name="logoprincipal"
                                                        onChange={(e) =>
                                                            setPrincipal(
                                                                e.target
                                                                    .files[0]
                                                            )
                                                        }
                                                        type="file"
                                                        className="sr-only"
                                                    />
                                                </label>
                                                <p> {principal?.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full">
                                <label
                                    htmlFor="secundario"
                                    className="block font-medium text-gray-900 text-xl"
                                >
                                    Logo Secundario
                                </label>
                                <div className="mt-2 flex justify-between rounded-lg border shadow-lg ">
                                    <div className="h-[200px] w-1/2 bg-[rgba(0,0,0,0.2)] py-4">
                                        <img
                                            className="w-full h-full object-contain"
                                            src={logos?.secundario_url}
                                            alt=""
                                        />
                                    </div>
                                    <div className="flex items-center justify-center w-1/2">
                                        <div className="text-center items-center h-fit self-center">
                                            <div className="mt-4 flex flex-col text-sm/6 text-gray-600">
                                                <label
                                                    htmlFor="secundario"
                                                    className="relative cursor-pointer rounded-md  font-semibold bg-primary-red  text-white py-1 px-2"
                                                >
                                                    <span>Cambiar Imagen</span>
                                                    <input
                                                        id="secundario"
                                                        name="secundario"
                                                        onChange={(e) =>
                                                            setSecundario(
                                                                e.target
                                                                    .files[0]
                                                            )
                                                        }
                                                        type="file"
                                                        className="sr-only"
                                                    />
                                                </label>
                                                <p> {secundario?.name} </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <h2 className="text-3xl border-b-2 pb-2">Nosotros</h2>
                <div className="py-5">
                    <div className="pb-12">
                        <div className="flex flex-col gap-10">
                            <div className="flex flex-col gap-2">
                                <label
                                    className="text-lg"
                                    htmlFor="nosotrosTitle"
                                >
                                    Titulo
                                </label>
                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    id="nosotrosTitle"
                                    type="text"
                                    className="w-full border pl-2 shadow-md py-1"
                                />
                            </div>

                            <div className="">
                                <label htmlFor="about" className="text-lg  ">
                                    Descripcion
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

                            <div className="">
                                <label
                                    htmlFor="cover-photo"
                                    className="text-lg"
                                >
                                    Imagen
                                </label>
                                <div className="mt-2 flex justify-between rounded-lg border shadow-lg">
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
                                                    className="relative cursor-pointer rounded-md bg-white font-semibold "
                                                >
                                                    <span className="relative cursor-pointer rounded-md  font-semibold bg-primary-red  text-white py-2 px-2">
                                                        Cambiar Imagen
                                                    </span>
                                                    <p className="absolute w-[200px] -bottom-10 -right-10">
                                                        {image?.name}
                                                    </p>
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
                    <div className="w-full flex justify-end">
                        <button className="text-white bg-primary-red rounded-md py-1 px-2 hover:scale-95 transition-transform">
                            Actualizar
                        </button>
                    </div>
                </div>
            </form>
            <div className="px-6 flex flex-col gap-5 min-h-[510px]">
                <h2 className="text-3xl border-b-2 pb-2">Marcas</h2>
                <div className="flex flex-col gap-10">
                    <Toaster />
                    <div className="flex flex-col gap-3">
                        <h2 className="text-2xl font-bold">Agregar Marcas</h2>
                        <div className="flex flex-col gap-3 w-fit items-center">
                            <div className=" flex flex-row gap-2 items-center">
                                <label
                                    htmlFor="marca"
                                    className="bg-primary-red text-white px-2 py-1 rounded-md cursor-pointer"
                                >
                                    Elegir Imagen
                                    <input
                                        onChange={(e) =>
                                            setImageMarcas(e.target.files[0])
                                        }
                                        type="file"
                                        name="imagen"
                                        id="marca"
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            <span className="">{imageMarcas?.name}</span>
                            <button
                                onClick={addImage}
                                className="bg-primary-red text-white px-2 py-1 rounded-md"
                            >
                                Subir Imagen
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <h2 className="text-2xl font-bold">Marcas agregadas</h2>
                        <div className="flex flex-row gap-3 flex-wrap max-w-[800px]">
                            {brandImages?.map((image) => (
                                <div
                                    key={image.id}
                                    className="flex flex-col gap-2 w-40 h-40"
                                >
                                    <img
                                        src={image.image_url}
                                        alt=""
                                        className="w-full h-full object-cover border"
                                    />
                                    <button
                                        onClick={() => deleteImage(image.id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded-md"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
