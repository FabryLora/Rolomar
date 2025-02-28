import { DndContext, closestCenter } from "@dnd-kit/core";
import {
    SortableContext,
    arrayMove,
    horizontalListSortingStrategy,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axiosClient from "../axios";
import SliderImageComponent from "../components/SliderImageComponent";
import { useStateContext } from "../contexts/ContextProvider";

export default function SliderAdmin() {
    const { sliderInfo, fetchSliderImage, fetchSliderInfo } = useStateContext();
    const [title, setTitle] = useState();
    const [subtitle, setSubtitle] = useState();
    const [link, setLink] = useState("/");
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

        const sliderResponse = axiosClient.put("/slider/1", {
            title,
            subtitle,
            link,
        });

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

    const handleImageSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("image", images);

        formData.append("slider_id", 1);

        const response = axiosClient.post("/sliderimage", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        toast.promise(response, {
            loading: "Subiendo imagen...",
            success: "Imagen subida correctamente",
            error: "Error al subir la imagen",
        });

        try {
            await response;
            fetchSliderImage();
            fetchSliderInfo();

            console.log("Imagenes subidas:", response);
        } catch (err) {
            console.log(err);
        }
    };

    const [imagesDND, setImagesDND] = useState([]);

    useEffect(() => {
        axiosClient
            .get("/sliderimage")
            .then((res) =>
                setImagesDND(res.data.sort((a, b) => a.order - b.order))
            )
            .catch((err) => console.error(err));
    }, [sliderInfo]);

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const oldIndex = imagesDND.findIndex((img) => img.id === active.id);
        const newIndex = imagesDND.findIndex((img) => img.id === over.id);

        if (oldIndex !== -1 && newIndex !== -1) {
            const newImages = arrayMove(imagesDND, oldIndex, newIndex);

            setImagesDND(newImages); // Se actualiza el estado correcto

            axiosClient
                .post("/slider-images/reorder", {
                    order: newImages.map((img) => img.id),
                })
                .catch((err) => console.error("Error al reordenar:", err));
        }
    };

    const handleDeleteImage = (id) => {
        toast(
            (t) => (
                <span>
                    ¿Seguro que deseas eliminar esta imagen?
                    <div className="flex gap-2 mt-2">
                        <button
                            className="bg-red-500 text-white px-3 py-1 rounded"
                            onClick={() => {
                                axiosClient
                                    .delete(`/sliderimage/${id}`)
                                    .then(() => {
                                        setImagesDND((prev) =>
                                            prev.filter((img) => img.id !== id)
                                        );
                                        toast.success(
                                            "Imagen eliminada correctamente"
                                        );
                                    })
                                    .catch(() => {
                                        toast.error(
                                            "Error al eliminar la imagen"
                                        );
                                    })
                                    .finally(() => toast.dismiss(t.id)); // Cierra la alerta después de la acción
                            }}
                        >
                            Eliminar
                        </button>
                        <button
                            className="bg-gray-300 px-3 py-1 rounded"
                            onClick={() => toast.dismiss(t.id)} // Cierra la alerta sin hacer nada
                        >
                            Cancelar
                        </button>
                    </div>
                </span>
            ),
            {
                duration: Infinity, // Mantiene el toast visible por 5 segundos
            }
        );
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
                <div className="flex flex-col gap-4 w-full">
                    <DndContext
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={imagesDND.map((img) => img.id)}
                            strategy={horizontalListSortingStrategy}
                        >
                            <div className="flex gap-2">
                                {imagesDND.map((img) => (
                                    <SliderImageComponent
                                        key={img.id}
                                        id={img.id}
                                        image={img.image_url}
                                        onDelete={() =>
                                            handleDeleteImage(img.id)
                                        }
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
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
