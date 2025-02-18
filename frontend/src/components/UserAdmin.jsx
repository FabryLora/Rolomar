import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function UserAdmin({ user }) {
    const { fetchAllUsers } = useStateContext();
    const [error, setError] = useState(null);
    const [succ, setSucc] = useState(false);
    const [submiting, setSubmiting] = useState(false);
    const [updateView, setUpdateView] = useState(false);

    const [userSubmitInfo, setUserSubmitInfo] = useState({
        nomcuit: user?.nomcuit,
        email: user?.email,
        password: "",
        password_confirmation: "",
        cuit: user?.cuit,
        direccion: user?.direccion,
        provincia: user?.provincia,
        localidad: user?.localidad,
        lista: user?.lista,
    });

    const handleChange = (event) => {
        setUserSubmitInfo({
            ...userSubmitInfo,
            lista: event.target.value,
        });
    };

    const onSubmit = (ev) => {
        ev.preventDefault();
        setSubmiting(true);
        axiosClient
            .put(`/users/${user?.id}`, userSubmitInfo)
            .then(({ data }) => {
                setSucc(true);
                setSubmiting(false);
                fetchAllUsers();
                toast.success("Usuario actualizado correctamente");
            })
            .catch((error) => {
                if (error.response) {
                    setError(
                        Object.values(error.response.data.errors || {})
                            .flat()
                            .join(" ")
                    );
                } else {
                    setError("Ocurrió un error. Intenta nuevamente.");
                }
                setSubmiting(false);
                toast.error("Error al actualizar el usuario");
            });
    };

    const deleteUser = () => {
        axiosClient
            .delete(`/users/${user.id}`)
            .then(() => {
                fetchAllUsers();
                toast.success("Usuario eliminado correctamente");
            })
            .catch(() => {
                toast.error("Error al eliminar el usuario");
            });
    };

    const autorizar = () => {
        axiosClient
            .put(`/users/${user.id}`, { autorizado: 1 })
            .then(() => {
                fetchAllUsers();
                toast.success("Usuario autorizado correctamente");
            })
            .catch(() => {
                toast.error("Error al autorizar el usuario");
            });
    };

    const desautorizar = () => {
        axiosClient
            .put(`/users/${user.id}`, { autorizado: 0 })
            .then(() => {
                fetchAllUsers();
                toast.success("Usuario desautorizado correctamente");
            })
            .catch(() => {
                toast.error("Error al desautorizar el usuario");
            });
    };

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 h-[134px] text-center text-lg">
            <td>{user?.nomcuit}</td>
            <td>{user?.email}</td>
            <td>{user?.cuit}</td>
            <td>{user?.provincia}</td>
            <td>{user?.localidad}</td>
            <td>{user?.lista == "1" ? "Bombista" : "Mayorista"}</td>
            <td>
                {user?.autorizado == "1" ? (
                    <button
                        type="button"
                        onClick={desautorizar}
                        className="bg-red-500 py-1 px-2 text-white rounded-md"
                    >
                        Desautorizar
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={autorizar}
                        className="bg-green-500 py-1 px-2 text-white rounded-md"
                    >
                        Autorizar
                    </button>
                )}
            </td>
            <td>
                <div className="flex flex-col gap-2">
                    <button
                        onClick={() => setUpdateView(true)}
                        className="bg-blue-500 text-white px-2 rounded-md"
                    >
                        Editar
                    </button>
                    <button
                        onClick={deleteUser}
                        className="bg-red-500 text-white px-2 rounded-md"
                    >
                        Eliminar
                    </button>
                </div>
            </td>
            {updateView && (
                <div className="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-50 text-black flex justify-center items-center">
                    <form
                        onSubmit={onSubmit}
                        className="w-fit h-fit flex flex-col gap-3 bg-white p-5 rounded-md shadow-md border"
                    >
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-2 col-span-2">
                                <label htmlFor="name">Nombre de usuario</label>
                                <input
                                    value={userSubmitInfo.nomcuit}
                                    onChange={(ev) =>
                                        setUserSubmitInfo({
                                            ...userSubmitInfo,
                                            nomcuit: ev.target.value,
                                        })
                                    }
                                    className="w-full h-[45px] border pl-2"
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="password">Contraseña</label>
                                <input
                                    value={userSubmitInfo.password}
                                    onChange={(ev) =>
                                        setUserSubmitInfo({
                                            ...userSubmitInfo,
                                            password: ev.target.value,
                                        })
                                    }
                                    className="w-full h-[45px] border pl-2"
                                    type="password"
                                    name="password"
                                    id="password"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="password_confirmation">
                                    Confirmar contraseña
                                </label>
                                <input
                                    value={userSubmitInfo.password_confirmation}
                                    onChange={(ev) =>
                                        setUserSubmitInfo({
                                            ...userSubmitInfo,
                                            password_confirmation:
                                                ev.target.value,
                                        })
                                    }
                                    className="w-full h-[45px] border pl-2"
                                    type="password"
                                    name="password_confirmation"
                                    id="password_confirmation"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email">Email</label>
                                <input
                                    value={userSubmitInfo.email}
                                    onChange={(ev) =>
                                        setUserSubmitInfo({
                                            ...userSubmitInfo,
                                            email: ev.target.value,
                                        })
                                    }
                                    className="w-full h-[45px] border pl-2"
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="dni">Cuit</label>
                                <input
                                    value={userSubmitInfo?.cuit}
                                    onChange={(ev) =>
                                        setUserSubmitInfo({
                                            ...userSubmitInfo,
                                            cuit: ev.target.value,
                                        })
                                    }
                                    className="w-full h-[45px] border pl-2"
                                    type="text"
                                    name="dni"
                                    id="dni"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-2 col-span-2">
                                <label htmlFor="direccion">Dirección</label>
                                <input
                                    value={userSubmitInfo.direccion}
                                    onChange={(ev) =>
                                        setUserSubmitInfo({
                                            ...userSubmitInfo,
                                            direccion: ev.target.value,
                                        })
                                    }
                                    className="w-full h-[45px] border pl-2"
                                    type="text"
                                    name="direccion"
                                    id="direccion"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-3 col-span-2 gap-5">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="provincia">Provincia</label>
                                    <select
                                        value={userSubmitInfo.provincia}
                                        onChange={(ev) =>
                                            setUserSubmitInfo({
                                                ...userSubmitInfo,
                                                provincia: ev.target.value,
                                                localidad: "",
                                            })
                                        }
                                        className="py-2 border h-[45px]"
                                        name="provincia"
                                        id="provincia"
                                    >
                                        <option value="">
                                            Selecciona una provincia
                                        </option>
                                        <option value="test">test</option>
                                        {/* {provincias.map((pr) => (
                                        <option key={pr.id} value={pr.name}>
                                            {pr.name}
                                        </option>
                                    ))} */}
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="localidad">Localidad</label>
                                    <select
                                        value={userSubmitInfo.localidad}
                                        onChange={(ev) =>
                                            setUserSubmitInfo({
                                                ...userSubmitInfo,
                                                localidad: ev.target.value,
                                            })
                                        }
                                        className="py-2 border h-[45px]"
                                        name="localidad"
                                        id="localidad"
                                    >
                                        <option value="">
                                            Selecciona una localidad
                                        </option>
                                        <option value="test">test</option>
                                        {/* {provincias
                                        .find(
                                            (pr) =>
                                                pr.name ===
                                                userSubmitInfo.provincia
                                        )
                                        ?.localidades.map((loc, index) => (
                                            <option
                                                key={index}
                                                value={loc.name}
                                            >
                                                {loc.name}
                                            </option>
                                        ))} */}
                                    </select>
                                </div>
                                <div className="flex flex-col  ">
                                    <h2 className="self-start h-1/3">
                                        Tipo de cliente
                                    </h2>
                                    <div className="flex flex-row gap-2 h-2/3">
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name="tipo_usuario"
                                                value="1"
                                                onChange={handleChange}
                                                className="form-radio text-blue-600"
                                                checked={
                                                    userSubmitInfo?.lista ===
                                                    "1"
                                                }
                                            />
                                            <span>Bombista</span>
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name="tipo_usuario"
                                                value="2"
                                                onChange={handleChange}
                                                checked={
                                                    userSubmitInfo?.lista ===
                                                    "2"
                                                }
                                                className="form-radio text-blue-600"
                                            />
                                            <span>Mayorista</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row w-full justify-evenly">
                            <button
                                onClick={() => setUpdateView(false)}
                                className={`w-[325px] h-[47px] bg-blue-500 text-white self-center my-5`}
                                type="button"
                            >
                                CANCELAR
                            </button>
                            <button
                                className={`w-[325px] h-[47px] bg-primary-red text-white self-center my-5 ${
                                    submiting ? "bg-gray-400" : ""
                                }`}
                                type="submit"
                            >
                                {submiting
                                    ? "Cargando..."
                                    : "ACTUALIZAR CLIENTE"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </tr>
    );
}
