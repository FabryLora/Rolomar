import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

export default function NavBar() {
    const { logos } = useStateContext();

    const liks = [
        { title: "Nosotros", href: "/nosotros" },
        { title: "Productos", href: "/productos" },
        { title: "Novedades", href: "/novedades" },
        { title: "Contacto", href: "/contacto" },
    ];

    return (
        <div className="h-[100px] fixed top-0 left-0 w-screen z-40 flex flex-row justify-between items-center px-20">
            <Link to={"/"} className="h-[77px] w-[125px]">
                <img
                    className="w-full h-full object-cover"
                    src={logos?.principal_url}
                    alt=""
                />
            </Link>
            <div className="flex flex-row gap-10 text-base items-center">
                {liks.map((link) => (
                    <Link
                        key={link.title}
                        to={link.href}
                        className="text-white text-lg"
                    >
                        {link.title}
                    </Link>
                ))}
                <button className="h-[41px] w-[154px] border text-white">
                    Zona Privada
                </button>
            </div>
        </div>
    );
}
