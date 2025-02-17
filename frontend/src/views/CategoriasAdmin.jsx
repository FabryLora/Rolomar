import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axiosClient from "../axios";
import CategoryAdminCard from "../components/CategoryAdminCard";
import { useStateContext } from "../contexts/ContextProvider";
export default function CategoriasAdmin() {
    const { categorias, fetchCategorias } = useStateContext();

    const [imagen, setImagen] = useState();
    const [nombre, setNombre] = useState();
    const [orden, setOrden] = useState();

    const hanldeFileChange = (e) => {
        setImagen(e.target.files[0]);
    };

    const submit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (imagen) {
            formData.append("imagen", imagen);
        }
        formData.append("nombre", nombre);
        formData.append("orden", orden);

        try {
            const response = await axiosClient.post("/categorias", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log(response);
            fetchCategorias();
            toast.success("Guardado correctamente");
        } catch (error) {
            toast.error("Error al guardar");
        }
    };

    return (
        <div className="flex flex-col w-full">
            <ToastContainer />
            <div className="flex flex-col w-[90%] mx-auto py-10 gap-3">
                <h1 className="text-2xl">Categorias</h1>
                <div className="flex justify-center w-full">
                    <table className=" w-full shadow-md ">
                        <thead className=" bg-gray-400">
                            <tr className=" text-center">
                                <td className=" min-w-[200px] py-2">Imagen</td>
                                <td>Nombre</td>

                                <td>Orden</td>
                                <td>Editar</td>
                            </tr>
                        </thead>
                        <tbody className=" text-center ">
                            <tr className="h-[80px]">
                                <td>
                                    <label
                                        htmlFor="imagen"
                                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded cursor-pointer"
                                    >
                                        Seleccionar Imagen
                                    </label>
                                    <input
                                        id="imagen"
                                        onChange={hanldeFileChange}
                                        className="hidden"
                                        type="file"
                                    />
                                </td>
                                <td className="table-cell">
                                    <input
                                        value={nombre}
                                        onChange={(e) =>
                                            setNombre(e.target.value)
                                        }
                                        type="text"
                                        placeholder="Nombre de la categoria"
                                    />
                                </td>

                                <td className="table-cell">
                                    <input
                                        value={orden}
                                        onChange={(e) =>
                                            setOrden(e.target.value)
                                        }
                                        type="text"
                                        placeholder="Orden"
                                    />
                                </td>
                                <td className="table-cell">
                                    <button
                                        onClick={submit}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Crear categoria
                                    </button>
                                </td>
                            </tr>
                            {categorias.map((category) => (
                                <CategoryAdminCard
                                    key={category.id}
                                    category={category}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
