import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import defaultPhoto from "../assets/default-photo.png";
import addCartButton from "../assets/iconos/add-cart-button.svg";
import trashButton from "../assets/iconos/trash-icon.svg";
import { useStateContext } from "../contexts/ContextProvider";

export default function ProductRow({ product }) {
    const { addToCart, removeFromCart, userInfo, cart } = useStateContext();

    const [subtotal, setSubtotal] = useState(
        product?.additionalInfo?.subtotal || 0
    );
    const [unidadDeVenta, setUnidadDeVenta] = useState();

    useEffect(() => {
        setUnidadDeVenta(product?.unidad_venta);
    }, [product]);
    const [cantidad, setCantidad] = useState(
        cart?.find((prod) => prod?.id == product?.id)?.additionalInfo
            ?.cantidad || product?.unidad_venta
    );
    const [extraInfo, setExtraInfo] = useState({
        cantidad: 0,
        subtotal: subtotal,
    });
    const [carrito, setCarrito] = useState(false);
    const [trash, setTrash] = useState(false);

    const handleChange = (value) => {
        const unidad = Number(product.unidad_venta);
        let newValue = Math.round(value / unidad) * unidad; // Redondea al múltiplo más cercano
        if (newValue >= unidad) setCantidad(newValue);
    };

    const location = useLocation();

    const [cleanPathname, setCleanPathname] = useState(
        location.pathname.replace(/^\/+/, "").replace(/-/g, " ").split("/")
    );

    useEffect(() => {
        setCleanPathname(
            location.pathname.replace(/^\/+/, "").replace(/-/g, " ").split("/")
        );
    }, [location]);

    useEffect(() => {
        const existsInCart = cart.find((item) => item.id === product.id);

        if (existsInCart) {
            addToCart(product, { cantidad, subtotal });
        }
    }, [cantidad, subtotal]);

    useEffect(() => {
        setSubtotal(
            userInfo?.lista == 2
                ? Number(product?.precio_mayorista) * cantidad
                : Number(product?.precio_minorista) * cantidad
        );
    }, [cantidad, product, userInfo, unidadDeVenta]);

    return (
        <div className="grid grid-cols-9 items-center justify-center py-2 border-b text-[#515A53]">
            <div className="flex justify-center w-[85px] h-[85px] border max-sm:hidden">
                <img
                    src={product?.imagen_url || defaultPhoto}
                    alt={product?.name}
                    className="object-cover h-full w-full"
                    onError={(e) => {
                        e.target.src = defaultPhoto;
                    }}
                />
            </div>
            <p className="text-left">{product?.codigo}</p>
            <p className="text-left ">{product?.categoria?.nombre}</p>
            <p className="text-left">{product?.nombre}</p>
            <p className="text-center">
                ${" "}
                {userInfo?.lista == 2
                    ? Number(product?.precio_mayorista)?.toLocaleString("es-AR")
                    : Number(product?.precio_minorista)?.toLocaleString(
                          "es-AR"
                      )}
            </p>
            <p className="text-center">{product?.unidad_venta}</p>

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
                                        handleChange(value);
                                    }
                                }}
                                type="number"
                                className="text-lg max-w-[50px] outline-none border-none bg-transparent text-left"
                            />

                            <div className="flex flex-col justify-center h-full">
                                <button
                                    className="flex items-center max-h-[12px]"
                                    onClick={() =>
                                        handleChange(
                                            Number(cantidad) +
                                                Number(product.unidad_venta)
                                        )
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
                                        handleChange(
                                            Number(cantidad) -
                                                Number(product.unidad_venta)
                                        )
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
            <p className="text-center">
                $
                {subtotal.toLocaleString("es-AR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}
            </p>
            <div className="flex justify-center">
                {cleanPathname[1] === "carrito" ? (
                    <button
                        className="hover:scale-95 transition-transform"
                        onMouseEnter={() => setTrash(true)}
                        onMouseLeave={() => setTrash(false)}
                        onClick={() => removeFromCart(product.id)}
                    >
                        <img src={trashButton} alt="" />
                    </button>
                ) : (
                    <button
                        className="hover:scale-95 transition-transform"
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
