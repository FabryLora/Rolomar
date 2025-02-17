import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";
export default function CategoryAdminCard({ category }) {
    const { fetchCategorias } = useStateContext();

    const [imagen, setImagen] = useState();
    const [nombre, setNombre] = useState(category?.nombre);
    const [orden, setOrden] = useState(category?.orden);
    const [edit, setEdit] = useState(false);

    const hanldeFileChange = (e) => {
        setImagen(e.target.files[0]);
    };

    const update = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (imagen) {
            formData.append("imagen", imagen);
        }
        formData.append("nombre", nombre);
        formData.append("orden", orden);

        try {
            const response = await axiosClient.post(
                `/categorias/${category?.id}?_method=PUT`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log(response);
            fetchCategorias();
            toast.success("Guardado correctamente");
        } catch (error) {
            toast.error("Error al guardar");
        }
    };

    const deleteCategory = async () => {
        try {
            const response = await axiosClient.delete(
                `/categorias/${category?.id}`
            );
            console.log(response);
            fetchCategorias();
            toast.success("Eliminado correctamente");
        } catch (error) {
            toast.error("Error al eliminar");
        }
    };

    return (
        <tr className=" border">
            <td className=" w-[90px] h-[90px]">
                <img
                    className="w-full h-full object-contain"
                    src={category?.imagen_url}
                    alt=""
                />
            </td>
            <td className=" align-middle">{nombre}</td>

            <td className=" align-middle">{orden}</td>
            <td className=" align-middle">
                <button onClick={() => setEdit(!edit)}>
                    <FontAwesomeIcon icon={faPenToSquare} size="xl" />
                </button>
            </td>
            {edit && (
                <div className="absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <form
                        onSubmit={update}
                        className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start gap-2"
                    >
                        <label htmlFor="imagen">Imagen</label>
                        <input
                            type="file"
                            onChange={hanldeFileChange}
                            className="w-full border py-1 pl-2"
                        />
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="w-full border py-1 pl-2"
                        />

                        <label htmlFor="order">Orden</label>
                        <input
                            type="text"
                            value={orden}
                            onChange={(e) => setOrden(e.target.value)}
                            className="w-full border py-1 pl-2"
                        />
                        <div className="flex flex-row gap-2">
                            <button
                                className="bg-green-500 text-white px-2 py-1"
                                type="submit"
                            >
                                Actualizar
                            </button>
                            <button
                                type="button"
                                className="bg-blue-500 text-white px-2 py-1"
                                onClick={() => setEdit(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className="bg-red-500 text-white px-2 py-1"
                                onClick={deleteCategory}
                            >
                                Eliminar
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </tr>
    );
}
