import { useStateContext } from "../contexts/ContextProvider";

export default function PedidoTemplate({ pedido, user }) {
    const { productos } = useStateContext();

    return (
        <div
            style={{
                fontFamily: "Arial, sans-serif",
                maxWidth: "800px",
                margin: "auto",
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
            }}
        >
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
                        <tr style={{ backgroundColor: "#333", color: "#fff" }}>
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
                        {pedido.productos.map((item, index) => (
                            <tr
                                key={index}
                                style={{
                                    backgroundColor:
                                        index % 2 === 0 ? "#fff" : "#f2f2f2",
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
                                            (prod) => prod?.id === item?.id
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
                                            (prod) => prod.id === item.id
                                        )?.categoria?.nombre
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
                                            (prod) => prod?.id === item?.id
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
                                                  prod?.id == item?.producto_id
                                          )?.precio_minorista
                                        : productos.find(
                                              (prod) =>
                                                  prod?.id == item?.producto_id
                                          )?.precio_mayorista}
                                </td>
                                <td
                                    style={{
                                        padding: "10px",
                                        border: "1px solid #ddd",
                                    }}
                                >
                                    unidad de venta
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
                                    {item?.subtotal_prod}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p>
                    <strong>Mensaje:</strong> {pedido?.mensaje}
                </p>
                <p>
                    <strong>Tipo de entrega:</strong> {pedido?.tipo_entrega}
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
                        <strong>Subtotal:</strong> ${pedido?.subtotal}
                    </p>

                    <p>
                        <strong>IVA:</strong> ${pedido?.iva}
                    </p>

                    <p style={{ fontSize: "18px", fontWeight: "bold" }}>
                        <strong>Total del pedido:</strong> ${pedido?.total}
                    </p>
                </div>
            </div>
        </div>
    );
}
