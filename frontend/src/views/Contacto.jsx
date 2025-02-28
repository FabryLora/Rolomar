import { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { ToastContainer, toast } from "react-toastify";
import letterIcon from "../assets/iconos/letter-red-icon.svg";
import locationIcon from "../assets/iconos/location-red-icon.svg";
import phoneIcon from "../assets/iconos/phone-red-icon.svg";
import whatsappIcon from "../assets/iconos/whatsapp-red-icon.svg";

import axiosClient from "../axios";
import EmailTemplate from "../components/EmailTemplate";
import { useStateContext } from "../contexts/ContextProvider";

export default function Contacto() {
    const { contactInfo, metadatos } = useStateContext();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const contactoInfo = [
        { icon: locationIcon, text: contactInfo?.location },
        { icon: letterIcon, text: contactInfo?.mail },
        { icon: phoneIcon, text: contactInfo?.phone },
        { icon: whatsappIcon, text: contactInfo?.wp },
    ];

    const inputInfo = [
        { title: "Nombre y Apellido", type: "text", id: "name" },
        { title: "Email", type: "email", id: "email" },
        { title: "Celular", type: "number", id: "phone" },

        { title: "Empresa", type: "text", id: "company" },
    ];

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        company: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const sendEmail = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); // Inicia el estado de carga

        const payload = { ...formData };

        const htmlContent = ReactDOMServer.renderToString(
            <EmailTemplate info={payload} />
        );

        try {
            const response = await axiosClient.post("/sendcontact", {
                html: htmlContent,
            });
            console.log("Correo enviado:", response.data);
            toast.success("Mensaje enviado correctamente");
        } catch (error) {
            console.error("Error al enviar el correo:", error);
            toast.error("Error al enviar el mensaje");
        } finally {
            setIsSubmitting(false); // Restablece el estado después de la petición
        }
    };

    return (
        <div className="flex  max-w-[1240px] mx-auto">
            <meta
                name="description"
                content={
                    metadatos?.find(
                        (datos) => datos?.seccion?.toLowerCase() == "contacto"
                    )?.descripcion
                }
            />
            <meta
                name="keywords"
                content={
                    metadatos?.find(
                        (datos) => datos?.seccion?.toLowerCase() == "contacto"
                    )?.keywords
                }
            />
            <ToastContainer />

            <div className=" text-[#515A53] py-20 flex flex-col gap-20 w-full">
                <div className="flex flex-row justify-between max-md:flex-col max-md:items-center max-md:w-full max-md:gap-10">
                    <div className="w-1/2 flex flex-col gap-10 max-md:w-full">
                        <h1 className="text-4xl">Contacto</h1>
                        <div className="flex flex-col gap-4 justify-start">
                            {contactoInfo.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex flex-row items-center gap-3"
                                >
                                    <img src={item.icon} alt="" />
                                    <p className="break-words w-[50%]">
                                        {item.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-1/2 flex justify-end max-md:w-full max-md:flex-col">
                        <form
                            className="w-fit flex flex-col gap-10 max-md:w-full"
                            onSubmit={sendEmail}
                        >
                            <div className="grid grid-cols-2 grid-rows-2 gap-5 items-center justify-center w-fit max-md:grid-cols-1  max-md:w-full ">
                                {inputInfo.map((info, index) => (
                                    <div
                                        className="flex flex-col gap-2 max-md:col-span-2"
                                        key={index}
                                    >
                                        <label htmlFor={info.id}>
                                            {info.title}
                                            {info.title !== "Empresa" && (
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            )}
                                        </label>
                                        <input
                                            className={`border pl-3 w-[264px] h-[48px] max-md:w-full `}
                                            type={info.type}
                                            name={info.id}
                                            id={info.id}
                                            value={formData[info.id]}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                ))}
                                <div className="col-span-2">
                                    <label htmlFor="message">Mensajes</label>
                                    <textarea
                                        className={`w-full h-[155px] border p-3 `}
                                        name="message"
                                        id="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                    ></textarea>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className={`w-full h-[47px] text-white ${
                                    isSubmitting
                                        ? "bg-gray-400"
                                        : "bg-primary-red"
                                }`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting
                                    ? "Enviando..."
                                    : "ENVIAR MENSAJE"}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="flex justify-center">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3276.1161650276135!2d-58.4697031!3d-34.80301920000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcd17898549301%3A0xc3438e74d688005d!2sRolomar%20Diesel!5e0!3m2!1ses-419!2sar!4v1739385595915!5m2!1ses-419!2sar"
                        width="600"
                        height="450"
                        className="w-full h-[520px]"
                        allowfullscreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
