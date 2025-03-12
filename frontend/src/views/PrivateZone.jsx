import { useEffect, useState } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
/* import NavbarPrivado from "../components/NavBarPrivado"; */
/* import WhatsappComponent from "../components/WhatsappComponent"; */
import NavBar from "../components/NavBar";
import WhatsappComponent from "../components/WhatsappComponent";
import { useStateContext } from "../contexts/ContextProvider";

export default function PrivateZone() {
    const { userToken } = useStateContext();

    const location = useLocation();

    const [cleanPathname, setCleanPathname] = useState(
        location.pathname.replace(/^\/+/, "").replace(/-/g, " ").split("/")
    );

    useEffect(() => {
        setCleanPathname(
            location.pathname.replace(/^\/+/, "").replace(/-/g, " ").split("/")
        );
    }, [location]);

    if (!userToken) {
        return <Navigate to={"/"} />;
    }

    return (
        <div className="font-roboto-condensed w-full overflow-y-hidden">
            <style>
                {`
                input[type="number"] {
    -moz-appearance: textfield; /* Firefox */
    -webkit-appearance: none;   /* Chrome, Safari */
    appearance: none;           /* Otros navegadores */
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
`}
            </style>
            <NavBar />
            <div className="flex flex-row gap-1 items-center justify-start  w-[1240px] mx-auto pt-10 max-sm:pl-6">
                <Link to={"/"}>Inicio</Link>
                <p>{">"}</p>
                <Link className="font-bold" to={"#"}>
                    {cleanPathname[1]?.charAt(0)?.toUpperCase() +
                        cleanPathname[1]?.slice(1)}
                </Link>
            </div>
            <div className="max-w-[1240px] mx-auto">
                <Outlet />
            </div>

            <Footer />
        </div>
    );
}
