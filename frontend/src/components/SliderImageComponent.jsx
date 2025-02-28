import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import toast from "react-hot-toast";
import axiosClient from "../axios";

export default function SliderImageComponent({ image, id, onDelete }) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        position: "relative",
        border: "1px solid #ccc",
        cursor: "grab",
        backgroundColor: "#fff",
        borderRadius: "5px",
        width: "100px", // Reducir el tamaño de la imagen
        height: "100px", // Ajustar la altura
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <button
                type="button"
                className="absolute z-50 text-red-500 right-2 top-1 bg-black px-1 rounded-md"
                onClick={(e) => {
                    e.stopPropagation(); // Evita que el evento llegue al drag
                    e.preventDefault(); // Previene eventos adicionales no deseados
                    onDelete();
                }}
                onPointerDown={(e) => e.stopPropagation()} // Previene que el DnD capture el evento antes del click
            >
                <FontAwesomeIcon icon={faTrash} />
            </button>

            <img
                src={image}
                alt="Slider"
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "5px",
                }}
            />
        </div>
    );
}
