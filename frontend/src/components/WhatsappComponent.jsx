import wpIcon from "../assets/iconos/wp-icon.svg";
import { useStateContext } from "../contexts/ContextProvider";

export default function WhatsappComponent() {
    const { contactInfo } = useStateContext();

    return (
        <a
            href={`https://wa.me/${contactInfo?.wp?.replace(/\D/g, "")}`} // Reemplaza con tu número de WhatsApp
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-5 right-5 z-[100]"
        >
            <img src={wpIcon} alt="" />
        </a>
    );
}
