import { useEffect } from "react";
import MiPedidoRow from "../components/MiPedidoRow";
import { useStateContext } from "../contexts/ContextProvider";

export default function Mispedidos() {
    const { pedidos, userInfo } = useStateContext();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="w-full py-20 min-h-[500px]">
            <table className=" w-full">
                <thead>
                    <tr className="bg-[#F5F5F5] font-bold">
                        <td className="h-[50px]"></td>
                        <td className="text-center">N° de pedido</td>
                        <td>Fecha de compra</td>
                        <td>Detalle</td>
                        <td>Fecha de entrega</td>
                        <td>Entregado</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {pedidos
                        .filter((pedido) => pedido?.user_id === userInfo?.id)
                        .map((pedido, index) => (
                            <MiPedidoRow key={index} pedido={pedido} />
                        ))}
                </tbody>
            </table>
        </div>
    );
}
