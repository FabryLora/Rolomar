import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function DefaultLayout() {
    const location = useLocation();

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

    return (
        <div>
            <NavBar />
            {cleanPathname[0] !== "inicio" && (
                <div className="flex flex-row gap-1 absolute left-20 top-[125px]">
                    <Link to={"/"}>Inicio</Link>
                    <p>{"/"}</p>
                    <Link className="font-bold" to={`/${cleanPathname[0]}`}>
                        {capitalizeFirstLetter(cleanPathname[0])}
                    </Link>
                </div>
            )}
            <Outlet />
        </div>
    );
}
