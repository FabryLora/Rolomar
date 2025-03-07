import { useEffect, useState } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { useStateContext } from "../contexts/ContextProvider";

export default function DefaultLayout() {
    const location = useLocation();

    const { userToken } = useStateContext();

    const [cleanPathname, setCleanPathname] = useState(
        location.pathname.replace(/^\/+/, "").replace(/-/g, " ").split("/")
    );

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    useEffect(() => {
        setCleanPathname(
            location.pathname.replace(/^\/+/, "").replace(/-/g, " ").split("/")
        );
    }, [location]);

    if (userToken) {
        return <Navigate to={"/privado"} />;
    }

    return (
        <div>
            <NavBar />
            {cleanPathname[0] !== "inicio" && cleanPathname?.length < 2 && (
                <div className="flex flex-row gap-1 max-w-[1240px] mx-auto py-10 max-md:pl-6">
                    <Link to={"/"}>Inicio</Link>
                    <p>{"/"}</p>
                    <Link className="font-bold" to={`/${cleanPathname[0]}`}>
                        {capitalizeFirstLetter(cleanPathname[0])}
                    </Link>
                </div>
            )}
            {cleanPathname?.length > 1 && cleanPathname?.length < 3 && (
                <div className="flex flex-row gap-1 max-w-[1240px] mx-auto py-10 max-md:pl-6">
                    <Link to={"/"}>Inicio</Link>
                    <p>{"/"}</p>
                    <Link to={`/${cleanPathname[0]}`}>
                        {capitalizeFirstLetter(cleanPathname[0])}
                    </Link>
                    <p>{"/"}</p>
                    <Link
                        className="font-bold"
                        to={`/${cleanPathname[0]}/${cleanPathname[1]}`}
                    >
                        {capitalizeFirstLetter(cleanPathname[1])}
                    </Link>
                </div>
            )}
            {cleanPathname?.length > 2 && (
                <div className="flex flex-row gap-1 max-w-[1240px] mx-auto py-10">
                    <Link to={"/"}>Inicio</Link>
                    <p>{"/"}</p>
                    <Link to={`/${cleanPathname[0]}`}>
                        {capitalizeFirstLetter(cleanPathname[0])}
                    </Link>
                    <p>{"/"}</p>
                    <Link
                        to={`/${cleanPathname[0]}/${cleanPathname[1]
                            .split("%20")
                            .join("-")}`}
                    >
                        {capitalizeFirstLetter(
                            cleanPathname[1].split("%20").join(" ")
                        )}
                    </Link>
                    <p>{"/"}</p>
                    <Link
                        className="font-bold"
                        to={`/${cleanPathname[0]}/${cleanPathname[1]}/${cleanPathname[2]}`}
                    >
                        {capitalizeFirstLetter(cleanPathname[2])}
                    </Link>
                </div>
            )}
            <Outlet />
            <Footer />
        </div>
    );
}
