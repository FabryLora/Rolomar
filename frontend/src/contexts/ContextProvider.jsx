import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../axios";

const StateContext = createContext({
    userToken: null,
    adminToken: null,
    setUserToken: () => {},
    setAdminToken: () => {},
    allUsers: [],
    fetchAllUsers: () => {},
    userInfo: [],
    fetchUserInfo: () => {},
    userId: "",
    allAdmins: [],
    fetchAllAdmins: () => {},
    sliderInfo: {},
    fetchSliderInfo: () => {},
    sliderImage: [],
    fetchSliderImage: () => {},
    logos: {},
    fetchLogos: () => {},
    nosotrosInicio: {},
    fetchNosotrosInicio: () => {},
    novedades: [],
    fetchNovedades: () => {},
    nosotros: {},
    fetchNosotros: () => {},
    contactInfo: {},
    fetchContactInfo: () => {},
    productos: [],
    grupoDeProductos: [],
    categorias: [],
    fetchProductos: () => {},
    fetchGrupoDeProductos: () => {},
    fetchCategorias: () => {},
    cart: [],
    addToCart: () => {},
    removeFromCart: () => {},
    clearCart: () => {},
    pedidos: [],
    fetchPedidos: () => {},
    pedidoProductos: [],
    fetchPedidoProductos: () => {},
    listadeprecios: [],
    fetchListadeprecios: () => {},
});

export const ContextProvider = ({ children }) => {
    const [allUsers, setAllUsers] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [userId, setUserId] = useState("");
    const [adminInfo, setAdminInfo] = useState({});
    const [allAdmins, setAllAdmins] = useState([]);
    const [sliderInfo, setSliderInfo] = useState({});
    const [sliderImage, setSliderImage] = useState([]);
    const [logos, setLogos] = useState({});
    const [nosotrosInicio, setNosotrosInicio] = useState({});
    const [novedades, setNovedades] = useState([]);
    const [nosotros, setNosotros] = useState({});
    const [contactInfo, setContactInfo] = useState({});
    const [productos, setProductos] = useState([]);
    const [grupoDeProductos, setGrupoDeProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [pedidos, setPedidos] = useState([]);
    const [pedidoProductos, setPedidoProductos] = useState([]);
    const [listadeprecios, setListadeprecios] = useState([]);

    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const addToCart = (product, additionalInfo) => {
        const exists = cart.find((item) => item.id === product.id);

        let updatedCart;

        if (exists) {
            updatedCart = cart.map((item) =>
                item.id === product.id
                    ? {
                          ...item,
                          additionalInfo: {
                              cantidad: additionalInfo.cantidad,
                              subtotal: additionalInfo.subtotal,
                          },
                      }
                    : item
            );
        } else {
            updatedCart = [...cart, { ...product, additionalInfo }];
        }

        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter((item) => item.id !== productId);

        setCart(updatedCart);
    };

    const clearCart = () => {
        setCart([]); // Vaciar el estado del carrito
        localStorage.removeItem("cart"); // Eliminar el carrito del localStorage
    };

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const [userToken, _setUserToken] = useState(
        localStorage.getItem("TOKEN") || ""
    );
    const [adminToken, _setAdminToken] = useState(
        localStorage.getItem("ADMIN_TOKEN") || ""
    );

    const setUserToken = (token) => {
        if (token) {
            localStorage.setItem("TOKEN", token);
        } else {
            localStorage.removeItem("TOKEN");
        }
        _setUserToken(token);
    };

    const setAdminToken = (token) => {
        if (token) {
            localStorage.setItem("ADMIN_TOKEN", token);
        } else {
            localStorage.removeItem("ADMIN_TOKEN");
        }
        _setAdminToken(token);
    };

    const fetchAllUsers = () => {
        axiosClient.get("/allusers").then(({ data }) => {
            setAllUsers(data.data);
        });
    };

    const fetchUserInfo = () => {
        axiosClient.get("/me").then(({ data }) => {
            setUserInfo(data[0]);
            setUserId(data.id);
        });
    };

    const fetchAllAdmins = () => {
        axiosClient.get("/alladmins").then(({ data }) => {
            setAllAdmins(data.data);
        });
    };

    const fetchAdminInfo = () => {
        axiosClient.get("/me-admin").then(({ data }) => {
            setAdminInfo(data);
        });
    };

    const fetchSliderInfo = () => {
        axiosClient.get("/slider").then(({ data }) => {
            setSliderInfo(data.data[0]);
        });
    };

    const fetchSliderImage = () => {
        axiosClient.get("/sliderimage").then(({ data }) => {
            setSliderImage(data.data);
        });
    };

    const fetchLogos = () => {
        axiosClient.get("/logos").then(({ data }) => {
            setLogos(data.data[0]);
        });
    };

    const fetchNosotrosInicio = () => {
        axiosClient.get("/nosotrosinicio").then(({ data }) => {
            setNosotrosInicio(data.data[0]);
        });
    };

    const fetchNovedades = () => {
        axiosClient.get("/novedades").then(({ data }) => {
            setNovedades(data.data);
        });
    };

    const fetchNosotros = () => {
        axiosClient.get("/nosotros").then(({ data }) => {
            setNosotros(data.data[0]);
        });
    };

    const fetchContactInfo = () => {
        axiosClient.get("/contact-info").then(({ data }) => {
            setContactInfo(data.data[0]);
        });
    };

    const fetchProductos = () => {
        axiosClient.get("/productos").then(({ data }) => {
            setProductos(data.data);
        });
    };

    const fetchGrupoDeProductos = () => {
        axiosClient.get("/grupo-de-productos").then(({ data }) => {
            setGrupoDeProductos(data.data);
        });
    };

    const fetchCategorias = () => {
        axiosClient.get("/categorias").then(({ data }) => {
            setCategorias(data.data);
        });
    };

    const fetchPedidos = () => {
        axiosClient.get("/pedidos").then(({ data }) => {
            setPedidos(data.data);
        });
    };

    const fetchPedidoProductos = () => {
        axiosClient.get("/pedido-productos").then(({ data }) => {
            setPedidoProductos(data.data);
        });
    };

    const fetchListadeprecios = () => {
        axiosClient.get("/listadeprecios").then(({ data }) => {
            setListadeprecios(data.data);
        });
    };

    useEffect(() => {
        fetchAllUsers();
        fetchAllAdmins();
        fetchSliderInfo();
        fetchSliderImage();
        fetchLogos();
        fetchNosotrosInicio();
        fetchNovedades();
        fetchNosotros();
        fetchContactInfo();
        fetchProductos();
        fetchGrupoDeProductos();
        fetchCategorias();
        fetchPedidos();
        fetchPedidoProductos();
        fetchListadeprecios();
    }, []);

    useEffect(() => {
        if (userToken) {
            fetchUserInfo();
        }
    }, [userToken]);

    useEffect(() => {
        if (adminToken) {
            fetchAdminInfo();
        }
    }, [adminToken]);

    return (
        <StateContext.Provider
            value={{
                listadeprecios,
                fetchListadeprecios,
                pedidoProductos,
                fetchPedidoProductos,
                pedidos,
                fetchPedidos,
                cart,
                addToCart,
                removeFromCart,
                clearCart,
                productos,
                fetchProductos,
                grupoDeProductos,
                fetchGrupoDeProductos,
                categorias,
                fetchCategorias,
                contactInfo,
                fetchContactInfo,
                nosotros,
                fetchNosotros,
                novedades,
                fetchNovedades,
                nosotrosInicio,
                fetchNosotrosInicio,
                logos,
                fetchLogos,
                sliderInfo,
                fetchSliderInfo,
                sliderImage,
                fetchSliderImage,
                userToken,
                adminToken,
                setUserToken,
                setAdminToken,
                allUsers,
                fetchAllUsers,
                userInfo,
                fetchUserInfo,
                userId,
                allAdmins,
                fetchAllAdmins,
                adminInfo,
                fetchAdminInfo,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
