import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function SliderAdmin() {
    const { sliderInfo, fetchSliderInfo } = useStateContext();
    const [title, setTitle] = useState();
    const [subtitle, setSubtitle] = useState();
    const [video, setVideo] = useState();
    const [fileName, setFileName] = useState("");

    useEffect(() => {
        setTitle(sliderInfo?.title);
        setSubtitle(sliderInfo?.subtitle);
    }, [sliderInfo]);

    const handleFileChange = (e) => {
        setVideo(e.target.files[0]);
        const file = e.target.files[0];
        file && setFileName(file.name); // Almacena los archivos seleccionados
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (video) {
            formData.append("video", video);
        }

        formData.append("title", title);
        formData.append("subtitle", subtitle);

        const sliderResponse = axiosClient.post(
            "/slider/1?_method=PUT",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        toast.promise(sliderResponse, {
            loading: "Actualizando...",
            success: "Información actualizada correctamente",
            error: "Error al actualizar la información",
        });

        try {
            // 1. Crear el producto

            await sliderResponse;

            console.log("Producto e imágenes creadas:", sliderResponse);

            fetchSliderInfo();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Toaster />
            <form
                onSubmit={handleSubmit}
                className="p-5 flex flex-col justify-between h-fit"
            >
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label
                                    htmlFor="username"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Titulo
                                </label>
                                <div className="mt-2">
                                    <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                        <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6"></div>
                                        <input
                                            value={title}
                                            onChange={(ev) =>
                                                setTitle(ev.target.value)
                                            }
                                            id="username"
                                            name="username"
                                            type="text"
                                            className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="about"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Sub-titulo
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        value={subtitle}
                                        onChange={(ev) =>
                                            setSubtitle(ev.target.value)
                                        }
                                        id="about"
                                        name="about"
                                        rows={3}
                                        className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 w-1/2"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full flex flex-col gap-5">
                                <label
                                    htmlFor="video"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Video
                                </label>
                                <div className="mt-2 flex flex-row items-center">
                                    <label
                                        className="cursor-pointer bg-indigo-500   rounded-md text-white px-3 py-1.5 text-base outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 "
                                        htmlFor="video"
                                    >
                                        Elegir Video
                                    </label>
                                    <span className="mx-2">{fileName}</span>

                                    <input
                                        type="file"
                                        id="video"
                                        name="video"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </div>
                                <div>
                                    <video
                                        className="w-1/2"
                                        autoPlay
                                        controls
                                        src={sliderInfo?.video}
                                    ></video>
                                </div>
                            </div>
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
                </div>
            </form>
        </>
    );
}
