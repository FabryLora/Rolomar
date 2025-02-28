import { Link } from "react-router-dom";
import testphoto from "../assets/logos/logo-principal.png";

export default function CategoryCard({ categoryObject }) {
    function quitarTildes(texto) {
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    return (
        <Link
            to={`/productos/${quitarTildes(
                categoryObject?.nombre
                    ?.split(" ")
                    ?.join("-")
                    ?.toLowerCase()
                    .replace(/-+$/g, "")
            )}`}
            className="w-[288px] h-[288px] relative border flex justify-center items-center text-white max-sm:w-full max-sm:px-6"
        >
            <img
                className="w-full h-full object-contain bg-gradient-to-t from-black to-white"
                src={categoryObject?.image || testphoto}
                alt=""
            />
            <h2 className="absolute bottom-5 font-bold">
                {categoryObject?.nombre}
            </h2>
        </Link>
    );
}
