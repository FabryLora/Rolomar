import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
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
    const [addWord, setAddWord] = useState("");

    useEffect(() => {
        setNombre(productObject?.nombre);
        setCodigo(productObject?.codigo);
        setPrecioMayorista(productObject?.precio_mayorista);
        setPrecioMinorista(productObject?.precio_minorista);
        setGrupoId(productObject?.grupo);
        setCategoriaId(productObject?.categoria?.id);
        setAddWord(productObject?.addword);
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
        formData.append("addword", addWord);

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
            fetchProductos(true);
            setEditable(false);
            toast.success("Guardado correctamente");
        } catch (err) {
            toast.error("Error al guardar");
        }
    };

    const deleteProduct = async () => {
        try {
            await axiosClient.delete(`/productos/${productObject.id}`);
            fetchProductos(true);
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
                        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50 text-left"
                    >
                        <form onSubmit={update} className="text-black">
                            <div className="bg-white p-4 w-[500px] rounded-md">
                                <h2 className="text-2xl font-semibold mb-4">
                                    Editar producto
                                </h2>

                                <div className="flex flex-col gap-4">
                                    <label htmlFor="imagen">Imagen</label>
                                    <div className="flex flex-row">
                                        <input
                                            type="file"
                                            name="imagen"
                                            id="imagen"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                        <label
                                            className="cursor-pointer bg-indigo-500 rounded-md text-white py-1 px-2"
                                            htmlFor="imagen"
                                        >
                                            Elegir imagen
                                        </label>
                                        <p>{image?.name}</p>
                                    </div>
                                    <label htmlFor="nombre">Nombre </label>
                                    <input
                                        className="border border-gray-300 p-2 rounded-md"
                                        type="text"
                                        name="nombre"
                                        id="nombre"
                                        value={nombre}
                                        onChange={(e) =>
                                            setNombre(e.target.value)
                                        }
                                    />
                                    <label htmlFor="codigo">Codigo </label>
                                    <input
                                        className="border border-gray-300 p-2 rounded-md"
                                        type="text"
                                        name="codigo"
                                        id="codigo"
                                        value={codigo}
                                        onChange={(e) =>
                                            setCodigo(e.target.value)
                                        }
                                    />
                                    <label htmlFor="precio_mayorista">
                                        Precio mayorista{" "}
                                    </label>
                                    <input
                                        className="border border-gray-300 p-2 rounded-md"
                                        type="text"
                                        name="precio_mayorista"
                                        id="precio_mayorista"
                                        value={precioMayorista}
                                        onChange={(e) =>
                                            setPrecioMayorista(e.target.value)
                                        }
                                    />
                                    <label htmlFor="precio_minorista">
                                        Precio minorista{" "}
                                    </label>
                                    <input
                                        className="border border-gray-300 p-2 rounded-md"
                                        type="text"
                                        name="precio_minorista"
                                        id="precio_minorista"
                                        value={precioMinorista}
                                        onChange={(e) =>
                                            setPrecioMinorista(e.target.value)
                                        }
                                    />
                                    <label htmlFor="adddword">Adword</label>
                                    <input
                                        className="border border-gray-300 p-2 rounded-md"
                                        type="text"
                                        name="precio_minorista"
                                        id="adddword"
                                        value={addWord}
                                        onChange={(e) =>
                                            setAddWord(e.target.value)
                                        }
                                    />

                                    <label htmlFor="grupoDeProducto">
                                        Grupo de productos
                                    </label>
                                    <select
                                        name="grupoDeProducto"
                                        id="grupoDeProducto"
                                        value={grupoId}
                                        onChange={(e) =>
                                            setGrupoId(e.target.value)
                                        }
                                        className="border border-gray-300 p-2 rounded-md"
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

                                    <div className="flex justify-end gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setEditable(false)}
                                            className="bg-primary-red py-1 px-2 text-white rounded-md"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-blue-500 py-1 px-2 text-white rounded-md"
                                        >
                                            Guardar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
            <form
                method="POST"
                onSubmit={update}
                className={`table-row h-[134px] border-b even:bg-gray-100 odd:bg-white`}
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

                <div className="table-cell px-6 py-4 align-middle w-[200px]">
                    <p>{codigo}</p>
                </div>

                <div className="table-cell px-6 py-4 align-middle">
                    <p>$ {precioMayorista}</p>
                </div>

                <div className="table-cell px-6 py-4 align-middle">
                    <p>$ {precioMinorista}</p>
                </div>

                <div className="table-cell px-6 py-4 align-middle">
                    {
                        grupoDeProductos?.find(
                            (grupos) => grupos?.id == productObject?.grupo
                        )?.nombre
                    }
                </div>

                <div className="table-cell px-6 py-4 align-middle">
                    <p>{addWord}</p>
                </div>

                <div className="table-cell align-middle text-center w-[140px] ">
                    <div className="flex flex-row gap-3 justify-center">
                        <button
                            type="button"
                            onClick={() => setEditable(true)}
                            className="border-blue-500 border py-1 px-2 text-white rounded-md w-10 h-10"
                        >
                            <FontAwesomeIcon
                                icon={faPen}
                                size="lg"
                                color="#3b82f6"
                            />
                        </button>
                        <button
                            type="button"
                            onClick={deleteProduct}
                            className="border-primary-red border py-1 px-2 text-white rounded-md w-10 h-10"
                        >
                            <FontAwesomeIcon
                                icon={faTrash}
                                size="lg"
                                color="#bc1d31"
                            />
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}
