import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function LogosAdmin() {
    const { logos, fetchLogos } = useStateContext();

    const [principal, setPrincipal] = useState();
    const [secundario, setSecundario] = useState();

    const update = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (principal) {
            formData.append("principal", principal);
        }
        if (secundario) {
            formData.append("secundario", secundario);
        }

        try {
            await axiosClient.post(`/logos/1?_method=PUT`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            fetchLogos();
            toast.success("Logos actualizados correctamente", {
                position: "top-center",
            });
        } catch (err) {
            toast.error("Error al actualizar", { position: "top-center" });
        }
    };

    return (
        <div className="">
            <ToastContainer />
            <form
                onSubmit={update}
                className="p-5 flex flex-col justify-between h-screen"
            >
                <div className="space-y-12 w-1/2">
                    <div className=" border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                                <label
                                    htmlFor="logoprincipal"
                                    className="block font-medium text-gray-900 text-xl"
                                >
                                    Logo Principal
                                </label>
                                <div className="mt-2 flex justify-between rounded-lg border border-dashed border-gray-900/25 ">
                                    <div className=" w-1/2 h-[200px] bg-[rgba(0,0,0,0.2)]">
                                        <img
                                            className="w-full h-full object-contain"
                                            src={logos?.principal_url}
                                            alt=""
                                        />
                                    </div>
                                    <div className="flex items-center justify-center w-1/2">
                                        <div className="text-center items-center h-fit self-center">
                                            <div className="mt-4 flex flex-col text-sm/6 text-gray-600">
                                                <label
                                                    htmlFor="logoprincipal"
                                                    className="relative cursor-pointer rounded-md  font-semibold bg-indigo-600 text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-gray-200"
                                                >
                                                    <span>Cambiar Imagen</span>
                                                    <input
                                                        id="logoprincipal"
                                                        name="logoprincipal"
                                                        onChange={(e) =>
                                                            setPrincipal(
                                                                e.target
                                                                    .files[0]
                                                            )
                                                        }
                                                        type="file"
                                                        className="sr-only"
                                                    />
                                                </label>
                                                <p> {principal?.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="secundario"
                                    className="block font-medium text-gray-900 text-xl"
                                >
                                    Logo Secundario
                                </label>
                                <div className="mt-2 flex justify-between rounded-lg border border-dashed border-gray-900/25 ">
                                    <div className="h-[200px] w-1/2 bg-[rgba(0,0,0,0.2)]">
                                        <img
                                            className="w-full h-full object-contain"
                                            src={logos?.secundario_url}
                                            alt=""
                                        />
                                    </div>
                                    <div className="flex items-center justify-center w-1/2">
                                        <div className="text-center items-center h-fit self-center">
                                            <div className="mt-4 flex flex-col text-sm/6 text-gray-600">
                                                <label
                                                    htmlFor="secundario"
                                                    className="relative cursor-pointer rounded-md  font-semibold bg-indigo-600 text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-gray-200"
                                                >
                                                    <span>Cambiar Imagen</span>
                                                    <input
                                                        id="secundario"
                                                        name="secundario"
                                                        onChange={(e) =>
                                                            setSecundario(
                                                                e.target
                                                                    .files[0]
                                                            )
                                                        }
                                                        type="file"
                                                        className="sr-only"
                                                    />
                                                </label>
                                                <p> {secundario?.name} </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6 pb-10">
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Actualizar
                    </button>
                </div>
            </form>
        </div>
    );
}
