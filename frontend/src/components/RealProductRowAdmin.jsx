import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function RealProductRowAdmin({ productObject }) {
    const { productos, grupoDeProductos, categorias, fetchProductos } =
        useStateContext();

    const [nombre, setNombre] = useState("");
    const [codigo, setCodigo] = useState("");
    const [precioMayorista, setPrecioMayorista] = useState("");
    const [precioMinorista, setPrecioMinorista] = useState("");
    const [image, setImage] = useState();
    const [grupoId, setGrupoId] = useState();
    const [categoriaId, setCategoriaId] = useState("");
    const [editable, setEditable] = useState(false);

    useEffect(() => {
        setNombre(productObject?.nombre);
        setCodigo(productObject?.codigo);
        setPrecioMayorista(productObject?.precio_mayorista);
        setPrecioMinorista(productObject?.precio_minorista);
        setGrupoId(productObject?.grupo);
        setCategoriaId(productObject?.categoria?.id);
    }, [productObject]);

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const update = async (ev) => {
        ev.preventDefault();

        const formData = new FormData();
        if (image) {
            formData.append("image", image);
        }

        formData.append("nombre", nombre);
        formData.append("codigo", codigo);
        formData.append("precio_minorista", precioMinorista);
        formData.append("precio_mayorista", precioMayorista);
        formData.append("categoria_id", categoriaId);
        formData.append("grupo_de_productos_id", grupoId);
        formData.append("medida", "0");

        try {
            const response = await axiosClient.post(
                `/productos/${productObject?.id}?_method=PUT`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            fetchProductos();
            toast.success("Guardado correctamente");
        } catch (err) {
            toast.error("Error al guardar");
        }
    };

    const deleteProduct = async () => {
        try {
            await axiosClient.delete(`/productos/${productObject.id}`);
            fetchProductos();
            setEditable(false);
            toast.success("Producto eliminado correctamente");
        } catch (error) {
            toast.error("Error al eliminar el producto");
            console.error("Error al eliminar el producto:", error);
        }
    };

    return (
        <>
            <AnimatePresence>
                {editable && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed w-screen h-screen bg-black bg-opacity-50 top-0 left-0 flex justify-center items-center"
                    >
                        <form action="">
                            <div className="bg-white p-8 rounded-lg">
                                <div className="flex justify-between items-center">
                                    <h1 className="text-2xl font-bold">
                                        Editar producto
                                    </h1>
                                    <button
                                        type="button"
                                        onClick={() => setEditable(false)}
                                        className="text-red-500"
                                    >
                                        X
                                    </button>
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="nombre">Nombre</label>
                                    <input
                                        type="text"
                                        id="nombre"
                                        value={nombre}
                                        onChange={(e) =>
                                            setNombre(e.target.value)
                                        }
                                        className="w-full border border-gray-300 rounded-md p-2"
                                    />
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="codigo">Código</label>
                                    <input
                                        type="text"
                                        id="codigo"
                                        value={codigo}
                                        onChange={(e) =>
                                            setCodigo(e.target.value)
                                        }
                                        className="w-full border border-gray-300 rounded-md p-2"
                                    />
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="precioMayorista">
                                        Precio mayorista
                                    </label>
                                    <input
                                        type="number"
                                        id="precioMayorista"
                                        value={precioMayorista}
                                        onChange={(e) =>
                                            setPrecioMayorista(e.target.value)
                                        }
                                        className="w-full border border-gray-300 rounded-md p-2"
                                    />
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="precioMinorista">
                                        Precio minorista
                                    </label>
                                    <input
                                        type="number"
                                        id="precioMinorista"
                                        value={precioMinorista}
                                        onChange={(e) =>
                                            setPrecioMinorista(e.target.value)
                                        }
                                        className="w-full border border-gray-300 rounded-md p-2"
                                    />
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="grupoId">
                                        Grupo de productos
                                    </label>
                                    <select
                                        name="grupoId"
                                        id="grupoId"
                                        value={grupoId}
                                        onChange={(e) =>
                                            setGrupoId(e.target.value)
                                        }
                                        className="w-full border border-gray-300 rounded-md p-2"
                                    >
                                        {grupoDeProductos.map((grupo) => (
                                            <option
                                                key={grupo.id}
                                                value={grupo.id}
                                            >
                                                {grupo.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="image">Imagen</label>
                                    <input
                                        type="file"
                                        id="image"
                                        onChange={handleFileChange}
                                        className="w-full border border-gray-300 rounded-md p-2"
                                    />
                                </div>
                                <div className="mt-4 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={deleteProduct}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md mr-4"
                                    >
                                        Eliminar
                                    </button>
                                    <button
                                        type="submit"
                                        onClick={update}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                    >
                                        Guardar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
            <form
                method="POST"
                onSubmit={update}
                className="table-row bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 h-[134px]"
            >
                <div className="table-cell px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white align-middle">
                    <div className="flex flex-row overflow-x-auto scrollbar-hide gap-2">
                        <div>
                            <img
                                className="w-20"
                                src={productObject?.imagen_url}
                                alt=""
                            />
                        </div>
                    </div>
                </div>

                <div className="table-cell px-6 py-4 align-middle">
                    <p>{nombre}</p>
                </div>

                <div className="table-cell px-6 py-4 align-middle">
                    <p>{codigo}</p>
                </div>

                <div className="table-cell px-6 py-4 align-middle">
                    <p>${precioMayorista}</p>
                </div>

                <div className="table-cell px-6 py-4 align-middle">
                    <p>${precioMinorista}</p>
                </div>

                <div className="table-cell px-6 py-4 align-middle">asd</div>

                <div className="table-cell align-middle text-white w-[150px]">
                    <button
                        type="button"
                        onClick={() => setEditable(true)}
                        className="bg-blue-500 rounded-md px-4 py-2"
                    >
                        Editar
                    </button>
                </div>
            </form>
        </>
    );
}
