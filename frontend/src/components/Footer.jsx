import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import letterIcon from "../assets/iconos/letter-red-icon.svg";
import locationIcon from "../assets/iconos/location-red-icon.svg";
import phoneIcon from "../assets/iconos/phone-red-icon.svg";
import whatsappIcon from "../assets/iconos/whatsapp-red-icon.svg";
import { useStateContext } from "../contexts/ContextProvider";

export default function Footer() {
    const { contactInfo, logos, categoryInfo, userToken } = useStateContext();

    function removeAccents(str) {
        return str?.normalize("NFD")?.replace(/[\u0300-\u036f]/g, "");
    }

    const soloDejarNumeros = (str) => {
        return str?.replace(/\D/g, "");
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

    const contactoInfo = [
        {
            icon: locationIcon,
            text: contactInfo?.location,
            href: contactInfo?.location
                ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      contactInfo.location
                  )}`
                : null,
        },
        {
            icon: phoneIcon,
            text: contactInfo?.phone,
            href: contactInfo?.phone
                ? `tel:${soloDejarNumeros(contactInfo.phone)}`
                : null,
        },
        {
            icon: whatsappIcon,
            text: contactInfo?.wp,
            href: contactInfo?.wp
                ? `https://wa.me/${soloDejarNumeros(contactInfo.wp)}`
                : null,
        },
        {
            icon: letterIcon,
            text: contactInfo?.mail,
            href: contactInfo?.mail ? `mailto:${contactInfo.mail}` : null,
        },
        {
            icon: letterIcon,
            text: contactInfo?.mail_dos,
            href: contactInfo?.mail_dos
                ? `mailto:${contactInfo.mail_dos}`
                : null,
        },
    ];

    const Links = [
        { name: "Nosotros", path: "/nosotros" },
        { name: "Calidad", path: "/calidad" },
        { name: "Novedades", path: "/novedades" },
        { name: "Contacto", path: "/contacto" },
    ];

    return (
        <footer className="bg-black h-[402px] max-sm:h-fit font-roboto-condensed text-white flex flex-col justify-between">
            <div className="flex flex-row flex-wrap justify-between max-sm:justify-start items-center h-full order-1 max-w-[1240px] md:w-[1240px] mx-auto max-md:flex-col max-md:w-full max-md:mx-0 max-md:items-start">
                {/* logos y redes */}
                <Link
                    to={"/"}
                    className="flex flex-col justify-center items-center gap-8 order-1 max-sm:mx-auto"
                >
                    <div className="flex flex-col max-sm:py-5">
                        <img src={logos?.secundario_url} alt="" />
                    </div>
                </Link>

                {/* footer nav */}
                <div
                    className={`flex flex-col gap-7 order-2 max-sm:px-8 ${
                        cleanPathname[0] == "privado" ? "hidden" : ""
                    }`}
                >
                    <h2 className="text-xl font-semibold">Secciones</h2>
                    <div className="grid grid-cols-2 grid-rows-4 gap-4 gap-x-32">
                        <Link className="text-base" to={"/inicio"}>
                            Inicio
                        </Link>
                        <Link className="text-base" to={"/nosotros"}>
                            Nosotros
                        </Link>
                        <Link className="text-base" to={"/productos"}>
                            Productos
                        </Link>
                        <Link className="text-base" to={"/novedades"}>
                            Novedades
                        </Link>
                        <Link className="text-base" to={"/contacto"}>
                            Contacto
                        </Link>
                    </div>
                </div>

                {/* contact info */}
                {/* Datos de contacto */}
                <div className="flex flex-col gap-3 order-3 max-sm:px-8 max-sm:pb-4">
                    <h2 className="text-xl font-semibold">Datos de Contacto</h2>
                    <div className="flex flex-col gap-3">
                        {contactoInfo.map((item, index) => (
                            <div
                                className="flex flex-row gap-4 items-center"
                                key={index}
                            >
                                <img
                                    className="w-[26px] h-[26px]"
                                    src={item.icon}
                                    alt=""
                                />
                                {item.href ? (
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-base break-words max-w-[300px]"
                                    >
                                        {item.text}
                                    </a>
                                ) : (
                                    <p className="text-base break-words max-w-[300px]">
                                        {item.text}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* copy y derechos */}
            <div className="h-[60px] flex flex-row justify-between items-center text-[14px] bg-primary-blue-dark order-2 md:w-[1240px] max-w-[1240px] mx-auto max-md:px-6">
                <p>
                    © Copyright 2025{" "}
                    <span className="font-semibold">Rolomar Diesel</span>. Todos
                    los derechos reservados
                </p>
                <p>by Osole</p>
            </div>
        </footer>
    );
}
