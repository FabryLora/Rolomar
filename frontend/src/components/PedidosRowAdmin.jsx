import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function PedidosRowAdmin({ pedidoObject }) {
    const { allUsers, productos, fetchPedidos } = useStateContext();

    const [isOpen, setIsOpen] = useState(false);

    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
                // Cierra el contenedor si se hace clic fuera
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const downloadFile = async () => {
        try {
            const filename = pedidoObject?.archivo_url.split("/").pop(); // Extraer el nombre del archivo

            const response = await axiosClient.get(
                `/downloadarchivo/${filename}`,
                {
                    responseType: "blob",
                }
            );

            // Obtener el tipo de archivo dinámicamente desde la respuesta
            const fileType =
                response.headers["content-type"] || "application/octet-stream";
            const blob = new Blob([response.data], { type: fileType });
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = filename; // Descargar con el nombre original
            document.body.appendChild(a);
            a.click();

            window.URL.revokeObjectURL(url);
            toast.success("Archivo descargado correctamente");
        } catch (error) {
            console.error("Error al descargar el archivo:", error);
            toast.error("Error al descargar el archivo");
        }
    };

    const user = allUsers?.find((user) => pedidoObject?.user_id == user?.id);

    const entregarPedido = async () => {
        try {
            const response = await axiosClient.put(
                `/pedidos/${pedidoObject?.id}`,
                {
                    entregado: "1",
                }
            );

            console.log(response);
            toast.success("Pedido entregado correctamente");
            fetchPedidos();
        } catch (error) {
            console.error("Error al entregar el pedido:", error);
        }
    };

    const cancelarPedido = async () => {
        try {
            const response = await axiosClient.put(
                `/pedidos/${pedidoObject?.id}`,
                {
                    entregado: "0",
                }
            );

            console.log(response);
            toast.success("Pedido cancelado correctamente");
            fetchPedidos();
        } catch (error) {
            console.error("Error al cancelar el pedido:", error);
        }
    };

    return (
        <div className="grid grid-cols-4 items-center justify-items-center py-2 border-b text-[#515A53]">
            <p>{pedidoObject?.id}</p>
            <p>{user?.nomcuit}</p>
            <div>
                {pedidoObject?.entregado != "1" ? (
                    <button
                        onClick={entregarPedido}
                        className="bg-red-500 px-2 py-1 rounded-md text-white hover:scale-95 transition-transform"
                    >
                        No entregado
                    </button>
                ) : (
                    <button
                        onClick={cancelarPedido}
                        className="bg-green-500 px-2 py-1 rounded-md text-white hover:scale-95 transition-transform"
                    >
                        Entregado
                    </button>
                )}
            </div>
            <button
                onClick={() => setIsOpen(true)}
                className="text-center py-1 w-[100px] bg-blue-500 text-white rounded-md hover:scale-95 transition-transform"
            >
                Ver
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center"
                    >
                        <div
                            ref={menuRef}
                            style={{
                                fontFamily: "Arial, sans-serif",
                                maxWidth: "800px",
                                margin: "auto",
                                padding: "20px",
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                backgroundColor: "#f9f9f9",
                            }}
                            className="relative max-h-[90vh] overflow-y-auto scrollbar-hide"
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute right-5"
                            >
                                X
                            </button>
                            <div style={{ marginBottom: "20px" }}>
                                <h1
                                    style={{
                                        borderBottom: "2px solid #333",
                                        paddingBottom: "5px",
                                    }}
                                >
                                    Información del Cliente:
                                </h1>
                                <p>
                                    <strong>Nombre:</strong> {user.nomcuit}
                                </p>
                                <p>
                                    <strong>Correo:</strong>{" "}
                                    {user.email ? user.email : "Sin correo"}
                                </p>
                                <p>
                                    <strong>CUIT:</strong> {user.cuit}
                                </p>

                                <p>
                                    <strong>Dirección:</strong> {user.direccion}
                                </p>
                                <p>
                                    <strong>Provincia:</strong> {user.provincia}
                                </p>
                                <p>
                                    <strong>Localidad:</strong> {user.localidad}
                                </p>
                            </div>

                            <div style={{ marginBottom: "20px" }}>
                                <h1
                                    style={{
                                        borderBottom: "2px solid #333",
                                        paddingBottom: "5px",
                                    }}
                                >
                                    Información del Pedido:
                                </h1>
                                <table
                                    style={{
                                        width: "100%",
                                        borderCollapse: "collapse",
                                        marginBottom: "20px",
                                    }}
                                >
                                    <thead>
                                        <tr
                                            style={{
                                                backgroundColor: "#333",
                                                color: "#fff",
                                            }}
                                        >
                                            <th
                                                style={{
                                                    padding: "10px",
                                                    border: "1px solid #ddd",
                                                }}
                                            >
                                                Código
                                            </th>
                                            <th
                                                style={{
                                                    padding: "10px",
                                                    border: "1px solid #ddd",
                                                }}
                                            >
                                                Rubro
                                            </th>
                                            <th
                                                style={{
                                                    padding: "10px",
                                                    border: "1px solid #ddd",
                                                }}
                                            >
                                                Descripcion
                                            </th>
                                            <th
                                                style={{
                                                    padding: "10px",
                                                    border: "1px solid #ddd",
                                                }}
                                            >
                                                Precio Unitario
                                            </th>
                                            <th
                                                style={{
                                                    padding: "10px",
                                                    border: "1px solid #ddd",
                                                }}
                                            >
                                                Unidad de venta
                                            </th>
                                            <th
                                                style={{
                                                    padding: "10px",
                                                    border: "1px solid #ddd",
                                                }}
                                            >
                                                Cantidad
                                            </th>
                                            <th
                                                style={{
                                                    padding: "10px",
                                                    border: "1px solid #ddd",
                                                }}
                                            >
                                                Subtotal
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pedidoObject.productos.map(
                                            (item, index) => (
                                                console.log(productos[0]),
                                                (
                                                    <tr
                                                        key={index}
                                                        style={{
                                                            backgroundColor:
                                                                index % 2 === 0
                                                                    ? "#fff"
                                                                    : "#f2f2f2",
                                                        }}
                                                    >
                                                        <td
                                                            style={{
                                                                padding: "10px",
                                                                border: "1px solid #ddd",
                                                            }}
                                                        >
                                                            {
                                                                productos.find(
                                                                    (prod) =>
                                                                        prod?.id ===
                                                                        item?.producto_id
                                                                )?.codigo
                                                            }
                                                        </td>
                                                        <td
                                                            style={{
                                                                padding: "10px",
                                                                border: "1px solid #ddd",
                                                            }}
                                                        >
                                                            {
                                                                productos.find(
                                                                    (prod) =>
                                                                        prod.id ===
                                                                        item.producto_id
                                                                )?.categoria
                                                                    ?.nombre
                                                            }
                                                        </td>
                                                        <td
                                                            style={{
                                                                padding: "10px",
                                                                border: "1px solid #ddd",
                                                            }}
                                                        >
                                                            {
                                                                productos.find(
                                                                    (prod) =>
                                                                        prod?.id ===
                                                                        item?.producto_id
                                                                )?.nombre
                                                            }
                                                        </td>
                                                        <td
                                                            style={{
                                                                padding: "10px",
                                                                border: "1px solid #ddd",
                                                            }}
                                                        >
                                                            $
                                                            {user?.lista == "1"
                                                                ? productos?.find(
                                                                      (prod) =>
                                                                          prod?.id ==
                                                                          item?.producto_id
                                                                  )
                                                                      ?.precio_minorista
                                                                : productos.find(
                                                                      (prod) =>
                                                                          prod?.id ==
                                                                          item?.producto_id
                                                                  )
                                                                      ?.precio_mayorista}
                                                        </td>
                                                        <td
                                                            style={{
                                                                padding: "10px",
                                                                border: "1px solid #ddd",
                                                            }}
                                                        >
                                                            {
                                                                productos.find(
                                                                    (prod) =>
                                                                        prod?.id ===
                                                                        item?.producto_id
                                                                )?.unidad_venta
                                                            }
                                                        </td>
                                                        <td
                                                            style={{
                                                                padding: "10px",
                                                                border: "1px solid #ddd",
                                                            }}
                                                        >
                                                            {item?.cantidad}
                                                        </td>

                                                        <td
                                                            style={{
                                                                padding: "10px",
                                                                border: "1px solid #ddd",
                                                            }}
                                                        >
                                                            $
                                                            {
                                                                item?.subtotal_prod
                                                            }
                                                        </td>
                                                    </tr>
                                                )
                                            )
                                        )}
                                    </tbody>
                                </table>
                                <p>
                                    <strong>Archivo:</strong>{" "}
                                    {pedidoObject?.archivo_url ? (
                                        <button
                                            onClick={downloadFile}
                                            className="bg-blue-500 px-2 py-1 rounded-md text-white"
                                        >
                                            Descargar archivo
                                        </button>
                                    ) : (
                                        "Sin archivo"
                                    )}
                                </p>
                                <p>
                                    <strong>Mensaje:</strong>{" "}
                                    {pedidoObject?.mensaje}
                                </p>
                                <p>
                                    <strong>Tipo de entrega:</strong>{" "}
                                    {pedidoObject?.tipo_entrega}
                                </p>

                                <div
                                    style={{
                                        backgroundColor: "#f2f2f2",
                                        padding: "10px",
                                        borderRadius: "5px",
                                        marginTop: "10px",
                                    }}
                                >
                                    <p>
                                        <strong>Subtotal:</strong> $
                                        {pedidoObject?.subtotal}
                                    </p>

                                    <p>
                                        <strong>IVA:</strong> $
                                        {pedidoObject?.iva}
                                    </p>

                                    <p
                                        style={{
                                            fontSize: "18px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        <strong>Total del pedido:</strong> $
                                        {pedidoObject?.total}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
