import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import defaultPhoto from "../assets/default-photo.png";
import addCartButton from "../assets/iconos/add-cart-button.svg";
import { useStateContext } from "../contexts/ContextProvider";

export default function ProductCard({ product }) {
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
            ?.cantidad || 1
    );
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
                ? Number(product?.precio_mayorista) * cantidad * unidadDeVenta
                : Number(product?.precio_minorista) * cantidad * unidadDeVenta
        );
    }, [cantidad, product, userInfo, unidadDeVenta]);

    return (
        <div className="flex flex-col items-start justify-center py-2 text-[#515A53]">
            <div className="flex justify-center w-full h-full border">
                <img
                    src={product?.imagen_url || defaultPhoto}
                    alt={product?.name}
                    className="object-cover h-full w-full"
                    onError={(e) => {
                        e.target.src = defaultPhoto;
                    }}
                />
            </div>
            <div className="grid grid-cols-2 justify-between gap-y-2 border px-4 py-2">
                <p className="font-bold border-b">Codigo:</p>
                <p className="text-left border-b">{product?.codigo}</p>
                <p className="font-bold border-b">Rubro:</p>
                <p className="text-left border-b">
                    {product?.categoria?.nombre}
                </p>
                <p className="font-bold border-b">Producto:</p>
                <p className="text-left border-b">{product?.nombre}</p>
                <p className="font-bold border-b">Precio:</p>
                <p className="text-left border-b">
                    $
                    {userInfo?.lista == 2
                        ? Number(product?.precio_mayorista)?.toLocaleString(
                              "es-AR"
                          )
                        : Number(product?.precio_minorista)?.toLocaleString(
                              "es-AR"
                          )}
                </p>
                <p className="font-bold border-b">Unidad de venta:</p>
                <p className="text-left border-b">{product?.unidad_venta}</p>
                <p className="font-bold border-b">Subtotal</p>
                <p className="text-left border-b">
                    $
                    {subtotal.toLocaleString("es-AR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
                </p>
                <div className="col-span-2 flex flex-row gap-3 justify-end py-2">
                    <div className="flex justify-center">
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
                    </div>

                    <div className="flex justify-center">
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
                    </div>
                </div>
            </div>
        </div>
    );
}
