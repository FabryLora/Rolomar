import { faPenToSquare, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../axios";

export default function MetadatosRow({ metadatosObject }) {
    const [seccion, setSeccion] = useState();
    const [keywords, setKeywords] = useState();
    const [descripcion, setDescripcion] = useState();

    useEffect(() => {
        setSeccion(metadatosObject.seccion);
        setKeywords(metadatosObject.keywords);
        setDescripcion(metadatosObject.descripcion);
    }, [metadatosObject]);

    const [edit, setEdit] = useState(false);

    const update = async (e) => {
        e.preventDefault();

        try {
            await axiosClient.post(
                `/metadatos/${metadatosObject.id}?_method=PUT`,
                {
                    seccion,
                    keywords,
                    descripcion,
                }
            );
            toast.success("Metadatos actualizados correctamente");
            setEdit(false);
        } catch (error) {
            console.log(error);
            toast.error("Error al actualizar los metadatos");
        }
    };

    return (
        <div className="table-row h-[50px] bg-gray-200 max-h-[100px]">
            <div className="table-cell align-middle pl-2">{seccion}</div>

            <div className="table-cell align-middle max-w-[200px] max-h-[100px] break-words pr-2">
                {keywords}
            </div>

            <div className="table-cell align-middle max-w-[200px] break-words">
                {descripcion}
            </div>

            <div className="table-cell text-center align-middle">
                <button onClick={() => setEdit(true)}>
                    <FontAwesomeIcon icon={faPenToSquare} size="xl" />
                </button>
            </div>
            {edit && (
                <div>
                    <div className="absolute top-0 left-0 bg-black opacity-50 w-screen h-screen"></div>
                    <form
                        className="absolute top-1/2 left-1/2 tranform -translate-x-1/2 -translate-y-1/2"
                        onSubmit={update}
                    >
                        <div className="relative flex flex-col gap-4 bg-white p-4 w-[300px]">
                            <button
                                className="absolute right-3 top-1"
                                onClick={() => setEdit(false)}
                            >
                                <FontAwesomeIcon icon={faX} size="sm" />
                            </button>
                            <h2>{seccion}</h2>
                            <label htmlFor="keywords">Keywords</label>
                            <input
                                className="border py-1 pl-2"
                                type="text"
                                value={keywords}
                                onChange={(e) => setKeywords(e.target.value)}
                                id="keywords"
                            />
                            <label htmlFor="descripcion">Descripcion</label>
                            <input
                                className="border py-1 pl-2"
                                type="text"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                id="descripcion"
                            />
                            <button
                                className="bg-blue-500 text-white py-1"
                                type="submit"
                            >
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
