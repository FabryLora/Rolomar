import {
    faSquareFacebook,
    faSquareInstagram,
    faSquareWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import {
    faEnvelope,
    faLocationDot,
    faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function ContactoAdmin() {
    const { contactInfo, fetchContactInfo } = useStateContext();

    useEffect(() => {
        fetchContactInfo();
    }, []);

    const [mail, setMail] = useState(contactInfo?.mail);
    const [maildos, setMaildos] = useState(contactInfo?.mail_dos);
    const [phone, setPhone] = useState(contactInfo?.phone);
    const [wp, setWp] = useState(contactInfo?.wp);
    const [location, setLocation] = useState(contactInfo?.location);
    const [ig, setIg] = useState(contactInfo?.ig);
    const [fb, setFb] = useState(contactInfo?.fb);

    useState(() => {
        setMail(contactInfo?.mail);
        setPhone(contactInfo?.phone);
        setWp(contactInfo?.wp);
        setLocation(contactInfo?.location);
        setIg(contactInfo?.ig);
        setFb(contactInfo?.fb);
    }, [contactInfo]);

    const submit = (ev) => {
        ev.preventDefault();

        axiosClient
            .put("/contact-info/1", {
                mail,
                mail_dos: maildos,
                phone,
                wp,
                location,
                ig,
                fb,
            })
            .then(() => {
                fetchContactInfo();
                toast.success("Guardado correctamente");
            })
            .catch((err) => {
                toast.error("Error al guardar");
            });
    };

    return (
        <>
            <Toaster />
            <form
                onSubmit={submit}
                className="p-5 flex flex-col justify-between h-screen"
            >
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-2 grid-rows-3 gap-x-6 gap-y-8 max-sm:grid-cols-1 ">
                            <div className="flex flex-row w-full gap-2">
                                <div className="w-full">
                                    <label
                                        htmlFor="username"
                                        className="flex flex-row gap-2 items-center text-sm/6 font-medium text-gray-900"
                                    >
                                        <FontAwesomeIcon
                                            icon={faEnvelope}
                                            size="lg"
                                        />
                                        <p>Mail</p>
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                            <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6"></div>
                                            <input
                                                value={mail}
                                                onChange={(ev) => {
                                                    setMail(ev.target.value);
                                                }}
                                                id="username"
                                                name="username"
                                                type="text"
                                                className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <label
                                        htmlFor="username"
                                        className="flex flex-row gap-2 items-center text-sm/6 font-medium text-gray-900"
                                    >
                                        <FontAwesomeIcon
                                            icon={faEnvelope}
                                            size="lg"
                                        />
                                        <p>Mail</p>
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                            <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6"></div>
                                            <input
                                                value={maildos}
                                                onChange={(ev) => {
                                                    setMaildos(ev.target.value);
                                                }}
                                                id="username"
                                                name="username"
                                                type="text"
                                                className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="">
                                <label
                                    htmlFor="username"
                                    className="flex flex-row gap-2 items-center text-sm/6 font-medium text-gray-900"
                                >
                                    <FontAwesomeIcon
                                        icon={faPhone}
                                        size={"lg"}
                                    />
                                    <p>Telefono</p>
                                </label>
                                <div className="mt-2">
                                    <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                        <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6"></div>
                                        <input
                                            value={phone}
                                            onChange={(ev) => {
                                                setPhone(ev.target.value);
                                            }}
                                            id="username"
                                            name="username"
                                            type="text"
                                            className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <label
                                    htmlFor="username"
                                    className="flex flex-row items-center gap-2 text-sm/6 font-medium text-gray-900"
                                >
                                    <FontAwesomeIcon
                                        icon={faSquareWhatsapp}
                                        size="xl"
                                    />
                                    <p>WhatsApp</p>
                                </label>
                                <div className="mt-2">
                                    <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                        <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6"></div>
                                        <input
                                            value={wp}
                                            onChange={(ev) => {
                                                setWp(ev.target.value);
                                            }}
                                            id="username"
                                            name="username"
                                            type="text"
                                            className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <label
                                    htmlFor="username"
                                    className="flex flex-row items-center gap-2 text-sm/6 font-medium text-gray-900"
                                >
                                    <FontAwesomeIcon
                                        icon={faLocationDot}
                                        size="lg"
                                    />
                                    <p>Ubicacion</p>
                                </label>
                                <div className="mt-2">
                                    <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                        <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6"></div>
                                        <input
                                            value={location}
                                            onChange={(ev) => {
                                                setLocation(ev.target.value);
                                            }}
                                            id="username"
                                            name="username"
                                            type="text"
                                            className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="">
                                <label
                                    htmlFor="username"
                                    className="flex flex-row items-center gap-2 text-sm/6 font-medium text-gray-900"
                                >
                                    <FontAwesomeIcon
                                        icon={faSquareInstagram}
                                        size="xl"
                                    />
                                    <p>Instagram</p>
                                </label>
                                <div className="mt-2">
                                    <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                        <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6"></div>
                                        <input
                                            value={ig}
                                            onChange={(ev) => {
                                                setIg(ev.target.value);
                                            }}
                                            id="username"
                                            name="username"
                                            type="text"
                                            className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="">
                                <label className="flex flex-row items-center gap-2 text-sm/6 font-medium text-gray-900">
                                    <FontAwesomeIcon
                                        icon={faSquareFacebook}
                                        size="xl"
                                    />
                                    <p> Facebook</p>
                                </label>
                                <div className="mt-2">
                                    <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                        <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6"></div>
                                        <input
                                            value={fb}
                                            onChange={(ev) => {
                                                setFb(ev.target.value);
                                            }}
                                            id="username"
                                            name="username"
                                            type="text"
                                            className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </>
    );
}
