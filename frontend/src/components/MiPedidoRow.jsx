import pedidoIcon from "../assets/iconos/pedido-icon.svg";

export default function MiPedidoRow({ pedido }) {
    return (
        <tr className="border-b">
            <td className="py-2">
                <div className="flex items-center justify-center w-[80px] h-[80px] bg-[#F5F5F5]">
                    <img src={pedidoIcon} alt="" />
                </div>
            </td>
            <td className="text-center"> {pedido?.id}</td>
            <td>{pedido?.created_at?.split("T")[0]}</td>
            <td>{pedido?.mensaje ? pedido?.mensaje : "Sin detalles"}</td>
            <td>{pedido?.mensaje}</td>

            <td>
                <button className="w-10 h-10">asd</button>
            </td>
            <td>
                <div className="flex flex-row gap-5">
                    <button className="w-[137px] h-[41px] flex justify-center items-center border border-primary-red text-primary-red hover:scale-95 transition-transform">
                        Ver detalles
                    </button>
                    <button className="w-[137px] h-[41px] flex justify-center items-center bg-primary-red text-white hover:scale-95 transition-transform">
                        Recomprar
                    </button>
                </div>
            </td>
        </tr>
    );
}
