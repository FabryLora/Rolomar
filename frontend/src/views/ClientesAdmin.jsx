import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axiosClient from "../axios";
import UserAdmin from "../components/UserAdmin";
import { useStateContext } from "../contexts/ContextProvider";

export default function ClientesAdmin() {
    const { allUsers, provincias } = useStateContext();
    const [error, setError] = useState(null);
    const [succ, setSucc] = useState(false);
    const [submiting, setSubmiting] = useState(false);

    const [userSubmitInfo, setUserSubmitInfo] = useState({
        nomcuit: "",
        email: "",
        password: "",
        password_confirmation: "",
        cuit: "",
        direccion: "",
        provincia: "",
        localidad: "",
        lista: "1",
        autorizado: "1",
        descuento: "0",
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
            .post("/signup", userSubmitInfo)
            .then(({ data }) => {
                setSucc(true);
                setSubmiting(false);
                toast.success("Cliente registrado con éxito");
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
                toast.error(error);
            });
    };

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredUsers = allUsers.filter((user) =>
        user.nomcuit.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    return (
        <div className="h-screen px-6">
            <Toaster />
            <div className="w-full flex flex-col items-center py-10">
                <h1 className="text-2xl font-bold pb-3">
                    Registrar un cliente:
                </h1>
                <form
                    onSubmit={onSubmit}
                    className="w-fit h-full flex flex-col gap-3 shadow-md p-5 bg-white"
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
                                required
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
                                        password_confirmation: ev.target.value,
                                    })
                                }
                                className="w-full h-[45px] border pl-2"
                                type="password"
                                name="password_confirmation"
                                id="password_confirmation"
                                required
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

                        <div className="flex flex-col gap-2">
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
                        <div className="flex flex-col gap-2">
                            <label htmlFor="descuento">Descuento</label>
                            <input
                                value={userSubmitInfo.descuento}
                                onChange={(ev) =>
                                    setUserSubmitInfo({
                                        ...userSubmitInfo,
                                        descuento: ev.target.value,
                                    })
                                }
                                className="w-full h-[45px] border pl-2"
                                type="text"
                                name="descuento"
                                id="descuento"
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
                                    {provincias.map((pr) => (
                                        <option key={pr.id} value={pr.name}>
                                            {pr.name}
                                        </option>
                                    ))}
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
                                    {provincias
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
                                        ))}
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
                                                userSubmitInfo?.lista === "1"
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
                                                userSubmitInfo?.lista === "2"
                                            }
                                            className="form-radio text-blue-600"
                                        />
                                        <span>Mayorista</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        className={`w-[325px] h-[47px] bg-primary-red text-white self-center my-5 ${
                            submiting ? "bg-gray-400" : ""
                        }`}
                        type="submit"
                    >
                        {submiting ? "Cargando..." : "REGISTRAR CLIENTE"}
                    </button>
                </form>
            </div>
            <div className="">
                <h2 className="text-2xl font-bold ">Clientes:</h2>
                <input
                    type="text"
                    placeholder="Buscar cliente por nombre..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1); // Resetear la paginación al filtrar
                    }}
                    className="mb-4 pl-2 py-2 border rounded w-1/2"
                />

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="text-center">
                            <th scope="col" className="px-6 py-3">
                                Usuario
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Descuento
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Provincia
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Localidad
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tipo de Cliente
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Autorizado
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="border">
                        {filteredUsers
                            .slice(
                                (currentPage - 1) * itemsPerPage,
                                currentPage * itemsPerPage
                            )
                            .map((user) => (
                                <UserAdmin key={user.id} user={user} />
                            ))}
                    </tbody>
                </table>
                <div className="flex justify-center bg-white text-black py-4 ">
                    <button
                        className="px-3 py-1 mx-1 border rounded disabled:opacity-50"
                        onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                    >
                        Anterior
                    </button>
                    <span className="px-3 py-1">
                        Página {currentPage} de {totalPages}
                    </span>
                    <button
                        className="px-3 py-1 mx-1 border rounded disabled:opacity-50"
                        onClick={() =>
                            setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages)
                            )
                        }
                        disabled={currentPage === totalPages}
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    );
}
