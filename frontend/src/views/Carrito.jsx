import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";

import { Link, useLocation } from "react-router-dom";
import axiosClient from "../axios";
import PedidoTemplate from "../components/PedidoTemplate";
import ProductRow from "../components/ProductRow";
import { useStateContext } from "../contexts/ContextProvider";

export default function Carrito() {
    const {
        cart,
        clearCart,
        userInfo,
        pedidos,
        userId,
        productos,
        informacionCarrito,
    } = useStateContext();

    const [selected, setSelected] = useState("retiro");
    const [fileName, setFileName] = useState("Seleccionar archivo");
    const [subtotal, setSubtotal] = useState();
    const [iva, setIva] = useState();
    const [totalFinal, setTotalFinal] = useState();
    const [mensaje, setMensaje] = useState("");
    const [archivo, setArchivo] = useState(null);
    const [tipo_entrega, setTipo_entrega] = useState("retiro cliente");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(false);
    const [succ, setSucc] = useState(false);
    const [succID, setSuccID] = useState();
    const [currencyType, setCurrencyType] = useState("pesos");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            setArchivo(file);
        } else {
            setFileName("Seleccionar archivo");
        }
    };

    useEffect(() => {
        let subtotal = 0;
        let iva = 0;
        let total = 0;
        let descuento = userInfo?.descuento > 0 ? userInfo.descuento : 0; // Verificamos si hay descuento válido

        cart.forEach((prod) => {
            subtotal += parseFloat(prod.additionalInfo.subtotal);
        });

        let subtotalConDescuento = subtotal * (1 - descuento / 100); // Aplicamos el descuento si existe
        total = subtotalConDescuento * 1.21;
        iva = total - subtotalConDescuento;

        setSubtotal(subtotalConDescuento.toFixed(2));
        setIva(iva.toFixed(2));
        setTotalFinal(total.toFixed(2));
    }, [cart, userInfo, tipo_entrega]);

    useEffect(() => {
        setArchivo(archivo);
        setMensaje(mensaje);
        setTipo_entrega(tipo_entrega);
    }, [archivo, mensaje, tipo_entrega]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData();
        if (mensaje) {
            formData.append("mensaje", mensaje);
        }
        if (archivo !== null) {
            formData.append("archivo", archivo);
        }
        formData.append("tipo_entrega", tipo_entrega);
        formData.append("subtotal", subtotal ? subtotal : 0);
        formData.append("iva", iva ? iva : 0);
        formData.append("entregado", 0);
        formData.append("user_id", userId);
        if (totalFinal !== "0.00") {
            formData.append("total", totalFinal);
        }

        try {
            const response = await axiosClient.post("/pedidos", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const pedidoId = response.data.data.id;

            setSuccID(pedidoId);

            cart.forEach((prod) => {
                const formProds = new FormData();

                formProds.append("pedido_id", pedidoId);
                formProds.append("producto_id", prod.id);
                formProds.append("cantidad", prod.additionalInfo.cantidad);
                formProds.append("subtotal_prod", prod.additionalInfo.subtotal);

                axiosClient.post(`/pedido-productos`, formProds, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            });

            const responsePedido = await axiosClient.get(
                `/pedidos/${pedidoId}`
            );
            const pedidoObject = responsePedido.data.data;
            console.log(pedidoObject);

            const htmlContent = ReactDOMServer.renderToString(
                <PedidoTemplate
                    pedido={pedidoObject}
                    user={userInfo}
                    productos={productos}
                />
            );

            // Enviar email con archivos adjuntos
            const emailFormData = new FormData();
            emailFormData.append("html", htmlContent);

            if (archivo !== null) {
                emailFormData.append("attachments[]", archivo);
            }

            const responseMail = await axiosClient.post(
                "/sendpedido",
                emailFormData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            clearCart();
            setSucc(true);
            console.log(responseMail);
        } catch (error) {
            setError(true);
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    return (
        <div className="w-full py-20 grid grid-cols-2 gap-10 max-sm:px-4">
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed left-[45%] top-10 bg-red-500 text-white p-3 rounded-lg"
                    >
                        <p>Error al enviar el pedido</p>
                    </motion.div>
                )}
                {succ && (
                    <div>
                        <div className="fixed w-screen h-screen bg-black opacity-50 top-0 left-0"></div>
                        <div className="fixed transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[642px] h-[343px] bg-white text-black shadow-lg flex flex-col items-center justify-evenly">
                            <h1 className="font-bold text-[32px]">
                                Pedido confirmado
                            </h1>
                            <div className="flex flex-col gap-8 items-center">
                                <p className="text-[#515A53] text-center w-[90%]">
                                    Su pedido #{succID} está en proceso y te
                                    avisaremos por email cuando esté listo. Si
                                    tienes alguna pregunta, no dudes en
                                    contactarnos.
                                </p>
                                <Link
                                    to={"/privado/productos"}
                                    className="bg-primary-red text-white flex items-center justify-center h-[47px] w-[253px]"
                                >
                                    VOLVER A PRODUCTOS
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </AnimatePresence>

            <div className="grid  w-full  items-start col-span-2">
                <div className="grid grid-cols-9 items-center justify-center bg-[#F5F5F5] h-[52px]  font-semibold max-sm:text-sm">
                    <p></p>
                    <p>Código</p>
                    <p>Rubro</p>
                    <p className="">Descripción</p>
                    <p className="text-center">Precio unitario</p>
                    <p className="text-center">Unidad de venta</p>
                    <p className="text-center">Cantidad</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center"></p>
                </div>

                <div className="">
                    <AnimatePresence>
                        {cart.map((prod, index) => (
                            <motion.div
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                key={index}
                            >
                                <ProductRow
                                    product={prod}
                                    currency={currencyType}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
            <div className="col-span-2">
                <div className="">
                    <Link
                        to={"/privado/productos"}
                        className="h-[47px] border border-primary-red text-primary-red font-semibold py-2 px-5 hover:scale-95 transition-transform"
                    >
                        SEGUIR COMPRANDO
                    </Link>
                </div>
            </div>

            <div className="h-[206px] border max-sm:col-span-2 max-sm:order-1">
                <div className="bg-[#EAEAEA]">
                    <h2 className="p-3 text-xl font-bold">
                        Informacion importante
                    </h2>
                </div>
                <div
                    className="p-5 "
                    dangerouslySetInnerHTML={{
                        __html: informacionCarrito?.informacion,
                    }}
                ></div>
            </div>
            <div className="w-full border bg-gray-50 h-[206px] max-sm:col-span-2 max-sm:order-3">
                <div className="bg-[#EAEAEA] p-3">
                    <h2 className=" text-xl font-bold">Entrega</h2>
                </div>

                <div className="flex flex-col gap-6 justify-center w-full h-[160px]">
                    {/* Opción: Retiro Cliente */}
                    <div
                        className={`flex items-center justify-between pl-3 rounded-lg  cursor-pointer`}
                        onClick={() => {
                            setSelected("retiro");
                            setTipo_entrega("retiro cliente");
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className={`w-5 h-5 rounded-full border-2 ${
                                    selected === "retiro"
                                        ? "border-red-500 flex items-center justify-center"
                                        : "border-gray-400"
                                }`}
                            >
                                {selected === "retiro" && (
                                    <div className="w-[10px] h-[10px] bg-red-500 rounded-full"></div>
                                )}
                            </div>
                            <label className="cursor-pointer">
                                Retiro cliente
                            </label>
                        </div>
                    </div>

                    {/* Opción: A convenir */}
                    <div
                        className={`flex items-center pl-3 rounded-lg  cursor-pointer`}
                        onClick={() => {
                            setSelected("acon");
                            setTipo_entrega("A Convenir");
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className={`w-5 h-5 rounded-full border-2 ${
                                    selected === "acon"
                                        ? "border-red-500 flex items-center justify-center"
                                        : "border-gray-400"
                                }`}
                            >
                                {selected === "acon" && (
                                    <div className="w-[10px] h-[10px] bg-red-500 rounded-full"></div>
                                )}
                            </div>
                            <label className="cursor-pointer">A Convenir</label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-[206px] flex flex-col gap-3 max-sm:col-span-2 max-sm:order-2">
                <div className="">
                    <h2 className=" text-xl font-bold">
                        Escribinos un mensaje
                    </h2>
                </div>
                <textarea
                    value={mensaje}
                    onChange={(e) => {
                        setMensaje(e.target.value);
                    }}
                    className="border h-[222px] w-full p-3"
                    name=""
                    id=""
                    rows={10}
                    placeholder="Dias especiales de entrega, cambios de domicilio, expresos, requerimientos especiales en la mercaderia, exenciones."
                ></textarea>
            </div>

            <div className="h-fit border max-sm:col-span-2 max-sm:order-5">
                <div className="bg-[#EAEAEA]">
                    <h2 className="p-3 text-xl font-bold">Pedido</h2>
                </div>

                <div className="flex flex-col justify-between px-4 text-xl gap-6 py-6 border-b">
                    <div className="flex flex-row justify-between w-full">
                        <p>Subtotal</p>
                        <p>
                            $
                            {Number(subtotal)?.toLocaleString("es-AR", {
                                minimumFractionDigits: 2,
                            })}
                        </p>
                    </div>

                    {userInfo?.descuento > 0 && (
                        <div className="flex flex-row justify-between w-full text-green-500">
                            <p>Descuento {userInfo?.descuento}%</p>
                            <p>
                                -$
                                {(
                                    parseFloat(subtotal) *
                                    (userInfo.descuento / 100)
                                )?.toLocaleString("es-AR", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </p>
                        </div>
                    )}

                    <div className="flex flex-row justify-between w-full">
                        <p>IVA 21%</p>
                        <p>
                            $
                            {Number(iva)?.toLocaleString("es-AR", {
                                minimumFractionDigits: 2,
                            })}
                        </p>
                    </div>
                </div>
                <div className="flex flex-row justify-between p-3">
                    <p className="font-medium text-2xl">
                        Total{" "}
                        {currencyType === "pesos" && (
                            <span className="text-base">
                                {"(IVA incluido)"}
                            </span>
                        )}
                    </p>
                    <p className="text-2xl">
                        $
                        {Number(totalFinal)?.toLocaleString("es-AR", {
                            minimumFractionDigits: 2,
                        })}
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-3 max-sm:col-span-2 max-sm:order-4">
                <h2 className="font-bold text-2xl">Adjuntar un archivo</h2>
                <div className="w-full border flex items-center justify-between">
                    <span className="text-gray-600 pl-4">{fileName}</span>
                    <label
                        htmlFor="fileInput"
                        className="text-red-500 font-semibold h-full cursor-pointer p-4 bg-gray-100 hover:bg-gray-200"
                    >
                        ADJUNTAR
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </div>
            </div>

            <div className="flex flex-row gap-3 w-full max-sm:col-span-2 max-sm:order-6 items-end">
                <Link
                    to={"/privado/productos"}
                    onClick={clearCart}
                    className="h-[47px] w-full border flex items-center justify-center border-primary-red text-primary-red hover:scale-95 transition-transform"
                >
                    CANCELAR PEDIDO
                </Link>
                <button
                    onClick={handleSubmit}
                    className={`w-full h-[47px] text-white hover:scale-95 transition-transform ${
                        isSubmitting ? "bg-gray-400" : "bg-primary-red"
                    }`}
                >
                    {isSubmitting ? "Enviando pedido..." : "REALIZAR PEDIDO"}
                </button>
            </div>
        </div>
    );
}
