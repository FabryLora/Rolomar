import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function MarcasAdmin() {
    const { brandImages, fetchBrandImages } = useStateContext();

    const [image, setImage] = useState();

    const addImage = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", image);

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

    return (
        <div className="h-screen w-screen p-4 flex flex-col gap-10">
            <Toaster />
            <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-bold">Agregar Marcas</h2>
                <div className="flex flex-col gap-3 w-fit items-center">
                    <div className=" flex flex-row gap-2 items-center">
                        <label
                            htmlFor="imagen"
                            className="bg-indigo-500 text-white px-2 py-1 rounded-md cursor-pointer"
                        >
                            Elegir Imagen
                            <input
                                onChange={(e) => setImage(e.target.files[0])}
                                type="file"
                                name="imagen"
                                id="imagen"
                                className="hidden"
                            />
                        </label>
                    </div>
                    <span className="">{image?.name}</span>
                    <button
                        onClick={addImage}
                        className="bg-green-500 text-white px-2 py-1 rounded-md"
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
    );
}
