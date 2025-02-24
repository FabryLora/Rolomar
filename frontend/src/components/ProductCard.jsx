import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useStateContext } from "../contexts/ContextProvider";

export default function ProductCard({ product }) {
    const [cantidad, setCantidad] = useState(0);
    const [extraInfo, setExtraInfo] = useState({
        cantidad: 0,
        descuento: product.discount
            ? product.price - product.price * (product.discount / 100)
            : product.price,
    });
    const handleChange = (value) => {
        if (value >= 0) setCantidad(value);
    };

    const location = useLocation();

    const { addToCart, removeFromCart } = useStateContext();

    useEffect(() => {
        setExtraInfo({
            ...extraInfo,
            cantidad,
        });
    }, [cantidad]);

    return (
        <div className="flex border flex-col">
            <div className="flex">
                <img
                    src={product?.image_url}
                    alt={product?.name}
                    className="object-cover h-full w-full"
                />
            </div>
            <div className="flex flex-col p-6 gap-2">
                <div className="flex flex-row justify-between border-b">
                    <p>Codigo:</p>
                    <p>{product?.code}</p>
                </div>
                <div className="flex flex-row justify-between border-b">
                    <p>Nombre:</p>
                    <p>{product?.name}</p>
                </div>
                <div className="flex flex-row justify-between border-b">
                    <p>Precio x unidad {"(Pesos)"}:</p>
                    <p>${product?.price?.toLocaleString("es-AR")}</p>
                </div>
                <div className="flex flex-row justify-between border-b">
                    <p>Precio x unidad {"(USD)"}:</p>
                    <p>${product?.dolar_price}</p>
                </div>

                <div className="flex flex-row gap-3 justify-end py-4">
                    <div className="flex justify-center">
                        {location.pathname === "/privado/pedido" ? (
                            <p>{product.additionalInfo.cantidad}</p>
                        ) : (
                            <div className="relative flex items-center">
                                {/* Contenedor con botones */}
                                <div className="flex flex-row border h-[41px] w-[89px] items-center bg-transparent justify-between px-2 overflow-hidden">
                                    <input
                                        value={cantidad}
                                        onChange={(e) => {
                                            const value = Number(
                                                e.target.value
                                            );
                                            if (!isNaN(value) && value >= 0) {
                                                setCantidad(value);
                                            }
                                        }}
                                        type="number"
                                        className="text-lg max-w-[50px] outline-none border-none bg-transparent text-left"
                                    />
                                    <div className="flex flex-col justify-center h-full">
                                        <button
                                            className="flex items-center max-h-[12px]"
                                            onClick={() =>
                                                handleChange(cantidad + 1)
                                            }
                                        >
                                            <FontAwesomeIcon
                                                icon={faChevronUp}
                                                size="xs"
                                            />
                                        </button>
                                        <button
                                            className="flex items-center max-h-[12px]"
                                            onClick={() =>
                                                handleChange(cantidad - 1)
                                            }
                                        >
                                            <FontAwesomeIcon
                                                icon={faChevronDown}
                                                size="xs"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-center">
                        {location.pathname === "/privado/pedido" ? (
                            <button onClick={() => removeFromCart(product.id)}>
                                {/* <img src={removeFromCartIcon} alt="" /> */}
                            </button>
                        ) : (
                            <button
                                onClick={() => {
                                    extraInfo?.cantidad == 0
                                        ? toast.error(
                                              "La cantidad tiene que ser mayor a 0",
                                              {
                                                  position: "top-center",
                                                  autoClose: 2200,
                                              }
                                          )
                                        : (addToCart(product, extraInfo),
                                          toast.success(
                                              "Producto agregado al carrito",
                                              {
                                                  position: "top-center",
                                                  autoClose: 2200,
                                              }
                                          ));
                                }}
                            >
                                {/* <img src={carritoRed} alt="" /> */}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
