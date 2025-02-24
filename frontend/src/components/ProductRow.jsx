import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import defaultPhoto from "../assets/default-photo.png";
import addCartButton from "../assets/iconos/add-cart-button.svg";
import { useStateContext } from "../contexts/ContextProvider";

export default function ProductRow({ product, currency }) {
    const { addToCart, removeFromCart, userInfo, cart } = useStateContext();

    const [subtotal, setSubtotal] = useState(0);
    const [unidadDeVenta, setUnidadDeVenta] = useState(10);
    const [cantidad, setCantidad] = useState(1);
    const [extraInfo, setExtraInfo] = useState({
        cantidad: 0,
        subtotal: subtotal,
    });
    const [carrito, setCarrito] = useState(false);
    const [trash, setTrash] = useState(false);
    const handleChange = (value) => {
        if (value >= 0) setCantidad(value);
    };

    const location = useLocation();

    useEffect(() => {
        setExtraInfo({
            cantidad,
            subtotal,
        });
    }, [cantidad, subtotal]);

    useEffect(() => {
        setSubtotal(
            userInfo?.lista == 2
                ? Number(product?.precio_mayorista) * cantidad * unidadDeVenta
                : Number(product?.precio_minorista) * cantidad * unidadDeVenta
        );
    }, [cantidad, product, userInfo]);

    console.log(cart);

    return (
        <div className="grid grid-cols-9 items-center justify-center py-2 border-b text-[#515A53]">
            <div className="flex justify-center w-[85px] h-[85px] border max-sm:hidden">
                <img
                    src={product?.image_url ? product?.image_url : defaultPhoto}
                    alt={product?.name}
                    className="object-cover h-full w-full"
                />
            </div>
            <p className="text-left">{product?.codigo}</p>
            <p className="text-left">{product?.categoria?.nombre}</p>
            <p className="text-center">{product?.nombre}</p>
            <p className="text-center">
                $
                {userInfo?.lista == 2
                    ? Number(product?.precio_mayorista)?.toLocaleString("es-AR")
                    : Number(product?.precio_minorista)?.toLocaleString(
                          "es-AR"
                      )}
            </p>
            <p className="text-center">{unidadDeVenta}</p>

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
                                    const value = Number(e.target.value);
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
                                    onClick={() => handleChange(cantidad + 1)}
                                >
                                    <FontAwesomeIcon
                                        icon={faChevronUp}
                                        size="xs"
                                    />
                                </button>
                                <button
                                    className="flex items-center max-h-[12px]"
                                    onClick={() => handleChange(cantidad - 1)}
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
            <p className="text-center">
                $
                {subtotal.toLocaleString("es-AR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}
            </p>
            <div className="flex justify-center">
                {location.pathname === "/privado/pedido" ? (
                    <button
                        onMouseEnter={() => setTrash(true)}
                        onMouseLeave={() => setTrash(false)}
                        onClick={() => removeFromCart(product.id)}
                    >
                        {/* {trash ? (
                            <img src={trashHover} alt="" />
                        ) : (
                            <img src={removeFromCartIcon} alt="" />
                        )} */}
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            if (cantidad === 0) {
                                toast.error(
                                    "La cantidad tiene que ser mayor a 0",
                                    {
                                        position: "top-center",
                                        autoClose: 2200,
                                    }
                                );
                            } else {
                                addToCart(product, {
                                    cantidad,
                                    subtotal,
                                }); // Asegura que se pasa bien
                                toast.success("Producto agregado al carrito", {
                                    position: "top-center",
                                    autoClose: 2200,
                                });
                            }
                        }}
                    >
                        <img src={addCartButton} alt="" />
                    </button>
                )}
            </div>
        </div>
    );
}
