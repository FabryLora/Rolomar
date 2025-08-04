import { useEffect, useState } from "react";
import ListadeproductosPrivadoRow from "../components/ListadeproductosPrivadoRow";
import { useStateContext } from "../contexts/ContextProvider";

export default function ListaDePrecios() {
    const { listadeprecios, currentUser, fetchListadeprecios } =
        useStateContext();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        fetchListadeprecios();
    }, []);

    const [rol, setRol] = useState(
        currentUser?.lista == "2" ? "mayorista" : "minorista"
    );

    useEffect(() => {
        setRol(currentUser?.lista == "2" ? "mayorista" : "minorista");
    }, [currentUser]);

    return (
        <div className="w-full py-20 min-h-[500px]">
            <table className="  w-full">
                <thead>
                    <tr className="bg-[#F5F5F5] font-bold">
                        <td className="h-[50px]"></td>
                        <td>Nombre</td>
                        <td>Formato</td>
                        <td>Peso</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {listadeprecios
                        ?.filter((lista) => lista?.nombre?.includes(rol))
                        ?.map((listadeprecio, index) => (
                            <ListadeproductosPrivadoRow
                                key={index}
                                archivoObject={listadeprecio}
                            />
                        ))}
                </tbody>
            </table>
        </div>
    );
}
