import { faEdit, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function AdministradorRow({ adminObject }) {
    const [edit, setEdit] = useState(false);

    const [name, setName] = useState(adminObject?.name);
    const [password, setPassword] = useState();
    const [password_confirmation, setPassword_confirmation] = useState();

    const { fetchAllAdmins } = useStateContext();
    const update = (ev) => {
        ev.preventDefault();

        axiosClient
            .put(`/admin/${adminObject?.id}`, {
                name,
                password,
                password_confirmation,
            })
            .then(({ data }) => {
                fetchAllAdmins();
                setEdit(false);
                toast.success("Administrador actualizado correctamente");
            })
            .catch((err) => {
                toast.error("Error al actualizar el administrador");
            });
    };

    return (
        <>
            <tr
                className={`border-b  h-[134px] text-black ${
                    adminObject?.id % 2 === 0 ? "bg-gray-200" : "bg-white"
                }`}
            >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white max-w-[340px] overflow-x-auto text-center">
                    {adminObject.name}
                </td>
                <td className="text-center">
                    <button onClick={() => setEdit(!edit)}>
                        <FontAwesomeIcon icon={faEdit} size="2xl" />
                    </button>
                </td>
            </tr>
            {edit && (
                <>
                    <div className="fixed w-screen h-screen top-0 left-0 bg-black opacity-50"></div>
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 right-10 mb-20 bg-white shadow-md p-5 font-roboto-condensed w-fit h-fit border text-black">
                        <button
                            onClick={() => setEdit(!edit)}
                            className="self-end"
                        >
                            <FontAwesomeIcon icon={faXmark} size="lg" />
                        </button>
                        <h2 className="font-bold text-[24px] py-5">
                            Actualizar Administrador
                        </h2>
                        <form
                            onSubmit={update}
                            className="w-fit h-full flex flex-col justify-around gap-3"
                            action=""
                        >
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="user">Usuario</label>
                                    <input
                                        value={name}
                                        onChange={(ev) =>
                                            setName(ev.target.value)
                                        }
                                        className="w-[328px] h-[45px] border pl-2"
                                        type="text"
                                        name="user"
                                        id="user"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="password">Contraseña</label>
                                    <input
                                        value={password}
                                        onChange={(ev) =>
                                            setPassword(ev.target.value)
                                        }
                                        className="w-[328px] h-[45px] border pl-2"
                                        type="password"
                                        name="password"
                                        id="password"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="password_confirmation">
                                        Confirmar Contraseña
                                    </label>
                                    <input
                                        value={password_confirmation}
                                        onChange={(ev) =>
                                            setPassword_confirmation(
                                                ev.target.value
                                            )
                                        }
                                        className="w-[328px] h-[45px] border pl-2"
                                        type="password"
                                        name="password_confirmation"
                                        id="password_confirmation"
                                    />
                                </div>
                            </div>

                            <button
                                className="w-[325px] h-[47px] bg-primary-red text-white self-center my-5"
                                type="submit"
                            >
                                Actualizar
                            </button>
                        </form>
                    </div>
                </>
            )}
        </>
    );
}
