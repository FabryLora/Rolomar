import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function Signup() {
    const { setUserToken, logos } = useStateContext();
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
            });
    };

    /* if (userToken) {
        return <Navigate to="/" />;
    } */

    console.log(userSubmitInfo?.lista);

    return (
        <div className="flex flex-col  justify-center items-center w-screen h-screen gap-5 bg-black bg-opacity-50 fixed top-0 left-0 z-10 overflow-y-auto">
            {succ && (
                <div>
                    <div className="fixed w-screen h-screen bg-black opacity-50 top-0 left-0 z-30"></div>
                    <div className="fixed transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[642px] h-[343px] bg-white text-black shadow-lg flex flex-col items-center justify-evenly z-40">
                        <h1 className="font-bold text-[32px]">CUENTA CREADA</h1>
                        <div className="flex flex-col gap-8 items-center">
                            <p className="text-[#515A53] text-center w-[90%]">
                                Te registraste correctamente, para poder entrar
                                a la zona privada espera a que un administrador
                                apruebe tu cuenta.
                            </p>
                            <Link
                                onClick={() => setSucc(false)}
                                to={"/"}
                                className="bg-primary-red text-white flex items-center justify-center h-[47px] w-[253px]"
                            >
                                VOLVER A LA PAGINA
                            </Link>
                        </div>
                    </div>
                </div>
            )}
            <Link to="/">
                <img src={logos?.principal_url} alt="Logo" />
            </Link>
            <div className="flex flex-col gap-2 bg-white shadow-md p-5 font-roboto-condensed w-fit h-fit z-20">
                {error && <div className="text-red-500">{error}</div>}
                <h2 className="font-bold text-[24px] py-5">Registrarse</h2>
                <form
                    onSubmit={onSubmit}
                    className="w-fit h-full flex flex-col gap-3"
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
                                    <label className="flex items-center ">
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
                                    <label className="flex items-center">
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
                        {submiting ? "Cargando..." : "REGISTRARSE"}
                    </button>
                </form>
                <div className="flex flex-col items-center">
                    <p>¿Ya tienes una cuenta?</p>
                    <Link className="text-primary-red" to="/iniciar-sesion">
                        INICIAR SESIÓN
                    </Link>
                </div>
            </div>
        </div>
    );
}
