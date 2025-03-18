import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import soloCart from "../assets/iconos/solo-cart.svg";
import ProductCard from "../components/ProductCard";
import ProductRow from "../components/ProductRow";
import { useStateContext } from "../contexts/ContextProvider";

export default function PrivateProducts() {
    const { grupoDeProductos, productos, categorias, cart } = useStateContext();
    const [categoria, setCategoria] = useState("");
    const [nombre, setNombre] = useState("");
    const [codigo, setCodigo] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [carrito, setCarrito] = useState(false);

    const filteredProducts = productos?.filter((product) => {
        return (
            (nombre
                ? product?.nombre?.toLowerCase()?.includes(nombre.toLowerCase())
                : true) &&
            (codigo
                ? product?.codigo?.toLowerCase()?.includes(codigo.toLowerCase())
                : true) &&
            (categoria
                ? product?.categoria?.nombre
                      ?.toLowerCase()
                      ?.includes(categoria?.toLowerCase())
                : true)
        );
    });
    useEffect(() => {
        if (cart.length > 0) {
            setCarrito(true);
        }
    }, [cart]);

    const totalPages = Math.ceil(
        (filteredProducts?.length || 0) / itemsPerPage
    );
    const paginatedProducts = filteredProducts?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const navigate = useNavigate();

    return (
        <div className="w-full pb-20 flex flex-col gap-20 max-sm:px-0">
            <AnimatePresence mode="popLayout">
                {carrito && (
                    <motion.div
                        onClick={() => navigate("/privado/carrito")}
                        key="cart-container" // Mantener un key estable
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 10,
                        }}
                        className="fixed flex justify-center items-center w-14 h-14 border border-primary-red rounded-full bottom-5 right-5 bg-white shadow-lg z-50 cursor-pointer"
                    >
                        <motion.div
                            key={`badge-${cart.length}`} // Clave diferente para animar el número
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1.2 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 15,
                            }}
                            className="absolute flex justify-center items-center rounded-full text-white bg-primary-red top-0 text-xs left-0 w-5 h-5"
                        >
                            {cart?.length}
                        </motion.div>
                        <img src={soloCart} alt="" />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="h-[134px] w-full bg-primary-blue text-black max-sm:h-fit">
                <div className="flex flex-col gap-2 justify-center h-full max-sm:px-6 max-sm:w-full">
                    <h2>Buscar por:</h2>
                    <div className="flex flex-row justify-evenly w-full gap-5 max-sm:flex-col">
                        <select
                            className="h-[41px] bg-transparent border w-full px-3"
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)}
                        >
                            <option disabled value="">
                                Seleccionar categoría
                            </option>
                            <option className="text-black" value="">
                                Todas las categorías
                            </option>
                            {categorias?.map((subCategory, index) => (
                                <option
                                    key={index}
                                    className="text-black"
                                    value={subCategory?.nombre}
                                >
                                    {subCategory?.nombre}
                                </option>
                            ))}
                        </select>
                        <input
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="h-[41px] bg-transparent border w-full pl-3"
                            type="text"
                            placeholder="Nombre"
                        />
                        <input
                            value={codigo}
                            onChange={(e) => setCodigo(e.target.value)}
                            className="h-[41px] bg-transparent border w-full pl-3"
                            type="text"
                            placeholder="Código"
                        />
                    </div>
                </div>
            </div>
            <div className="grid w-full max-sm:hidden">
                <div className="grid grid-cols-9 items-center justify-center bg-[#F5F5F5] h-[52px] font-semibold">
                    <p></p>
                    <p>Código</p>
                    <p>Rubro</p>
                    <p>Descripción</p>
                    <p className="text-center">Precio unitario</p>
                    <p className="text-center">Unidad de venta</p>
                    <p className="text-center">Cantidad</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center"></p>
                </div>
                <div className="h-fit">
                    {paginatedProducts?.map((prod) => (
                        <ProductRow key={prod?.id} product={prod} />
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-3 sm:hidden px-5">
                {paginatedProducts?.map((prod, index) => (
                    <ProductCard key={index} product={prod} />
                ))}
            </div>
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-5">
                    <button
                        className="px-3 py-1 border rounded"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        Anterior
                    </button>
                    <span>
                        Página {currentPage} de {totalPages}
                    </span>
                    <button
                        className="px-3 py-1 border rounded"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </div>
    );
}
