import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axiosClient from "../axios";
import SliderImageComponent from "../components/SliderImageComponent";
import { useStateContext } from "../contexts/ContextProvider";

export default function SliderAdmin() {
    const { sliderInfo, fetchSliderImage, fetchSliderInfo } = useStateContext();
    const [title, setTitle] = useState();
    const [subtitle, setSubtitle] = useState();
    const [link, setLink] = useState();
    const [images, setImages] = useState([]);
    const [fileName, setFileName] = useState("");

    useEffect(() => {
        setTitle(sliderInfo?.title);
        setSubtitle(sliderInfo?.subtitle);
        setLink(sliderInfo?.link);
    }, [sliderInfo]);

    const handleFileChange = (e) => {
        setImages(e.target.files[0]);
        const file = e.target.files[0];
        file && setFileName(file.name); // Almacena los archivos seleccionados
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // 1. Crear el producto
            const sliderResponse = await axiosClient.put("/slider/1", {
                title,
                subtitle,
                link,
            });

            console.log("Producto e imágenes creadas:", sliderResponse);
            toast.success("Actualizado correctamente", {
                position: "top-center",
            });
            fetchSliderInfo();
        } catch (err) {
            toast.error("Error al actualizar", { position: "top-center" });
            console.log(err);
        }
    };

    const handleImageSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            formData.append("image", images);

            formData.append("slider_id", 1);

            const response = await axiosClient.post("/sliderimage", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            fetchSliderImage();
            fetchSliderInfo();
            toast.success("Imagen subida correctamente", {
                position: "top-center",
            });
            console.log("Imagenes subidas:", response);
        } catch (err) {
            toast.error("Error al subir la imagen", { position: "top-center" });
            console.log(err);
        }
    };

    return (
        <>
            <ToastContainer />
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

                            <div className="sm:col-span-4">
                                <label
                                    htmlFor="username"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Link
                                </label>
                                <div className="mt-2">
                                    <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                        <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6"></div>
                                        <input
                                            value={link}
                                            onChange={(ev) =>
                                                setLink(ev.target.value)
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
            <div className="flex flex-col gap-4 w-full col-span-full p-5">
                <div className="col-span-full flex flex-row gap-3 items-center">
                    {sliderInfo?.images &&
                        sliderInfo?.images?.map((info, index) => (
                            <SliderImageComponent key={index} image={info} />
                        ))}
                </div>
                <div className="flex items-center gap-4 w-full">
                    <label className="cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Elegir Imagen
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>
                    {fileName && (
                        <span className="text-sm text-gray-700">
                            {fileName}
                        </span>
                    )}
                </div>
                <div>
                    <button
                        onClick={handleImageSubmit}
                        className="cursor-pointer rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    >
                        Subir Imagen
                    </button>
                </div>
            </div>
        </>
    );
}
