import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axiosClient from "../axios";
import NovedadesRow from "../components/NovedadesRow";
import { useStateContext } from "../contexts/ContextProvider";

export default function NovedadesAdmin() {
    const { novedades, fetchNovedades } = useStateContext();

    const [image, setImage] = useState();
    const [title, setTitle] = useState();
    const [text, setText] = useState();
    const [type, setType] = useState();
    const [featured, setFeatured] = useState(0);

    const handleFileChange = (e) => {
        setImage(e.target.files[0]); // Almacena los archivos seleccionados
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("type", type);
        formData.append("image", image);
        formData.append("title", title);
        formData.append("text", text);
        formData.append("featured", featured ? 1 : 0);

        const novedadesResponse = axiosClient.post("/novedades", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        toast.promise(novedadesResponse, {
            loading: "Guardando...",
            success: "Guardado correctamente",
            error: "Error al guardar",
        });

        try {
            await novedadesResponse;

            console.log(novedadesResponse);

            fetchNovedades();
        } catch (err) {
            console.error("Error al guardar:", err);
        }
    };

    return (
        <div className="relative overflow-x-auto px-6">
            <Toaster />
            <form
                onSubmit={handleSubmit}
                className=" flex flex-col justify-between h-fit"
            >
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                                <label
                                    htmlFor="cover-photo"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Imagen
                                </label>
                                <div className="mt-2 flex justify-between rounded-lg border border-dashed border-gray-900/25 ">
                                    <div className="flex items-center justify-start p-4 w-1/2">
                                        <div className="text-center items-center h-fit self-center flex flex-row justify-start gap-3">
                                            <div className=" flex text-sm/6 text-gray-600">
                                                <input
                                                    accept="image/*"
                                                    id="file-upload"
                                                    name="file-upload"
                                                    type="file"
                                                    onChange={handleFileChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="tipo"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Tipo de Novedad
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={type}
                                        onChange={(ev) =>
                                            setType(ev.target.value)
                                        }
                                        id="tipo"
                                        name="name"
                                        type="text"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="title"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Titulo
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={title}
                                        onChange={(ev) =>
                                            setTitle(ev.target.value)
                                        }
                                        id="name"
                                        name="name"
                                        type="text"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="text"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Descripcion
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        value={text}
                                        onChange={(ev) =>
                                            setText(ev.target.value)
                                        }
                                        id="text"
                                        name="text"
                                        rows={5}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="featured"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Destacado
                                </label>
                                <div className="mt-2 flex flex-row items-center gap-2">
                                    <input
                                        checked={featured}
                                        onChange={(ev) =>
                                            setFeatured(ev.target.checked)
                                        }
                                        id="featured"
                                        name="featured"
                                        type="checkbox"
                                        className=""
                                    />
                                    <p>
                                        Marca esta casilla si quieres que la
                                        novedad sea mostrada en el inicio
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Crear Novedad
                        </button>
                    </div>
                </div>
            </form>
            <div>
                <h2 className="text-2xl font-bold p-4">Novedades</h2>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Imagen
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Tipo Novedad
                        </th>

                        <th scope="col" className="px-6 py-3">
                            Titulo
                        </th>

                        <th scope="col" className="px-6 py-3">
                            Descripcion
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Destacado
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Editar
                        </th>
                    </tr>
                </thead>
                <tbody className="border">
                    {novedades.map((novedadesObject, index) => (
                        <NovedadesRow
                            key={index}
                            novedadesObject={novedadesObject}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
