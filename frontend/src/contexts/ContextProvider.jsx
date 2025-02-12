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
