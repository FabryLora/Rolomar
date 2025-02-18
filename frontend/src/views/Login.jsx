import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function Login() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { setUserToken, userToken, logos } = useStateContext();
    const [submiting, setSubmiting] = useState(false);

    const onSubmit = (ev) => {
        ev.preventDefault();
        setSubmiting(true);
        setError(""); // Limpiar errores previos

        axiosClient
            .post("/login", {
                nomcuit: user,
                password: password,
            })
            .then(({ data }) => {
                setSubmiting(false);
                setUserToken(data.token);
            })
            .catch((error) => {
                setSubmiting(false);
                if (error.response && error.response.data.error) {
                    const errorMessage = error.response.data.error;
                    if (
                        errorMessage ===
                        "The provided credentials are not correct"
                    ) {
                        setError(
                            "Las credenciales proporcionadas son incorrectas."
                        );
                    } else if (
                        errorMessage ===
                        "Your account is not authorized. Please contact support."
                    ) {
                        setError("Tu cuenta no está autorizada.");
                    } else {
                        setError(
                            "Ocurrió un error inesperado. Inténtalo de nuevo."
                        );
                    }
                } else {
                    setError(
                        "Ocurrió un problema con la conexión. Inténtalo nuevamente."
                    );
                }
            });
    };

    if (userToken) {
        return <Navigate to={"/"} />;
    }

    return (
        <div className="flex flex-col gap-10 justify-center items-center w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 z-10">
            <Link to={"/"}>
                <img src={logos?.secundario_url} alt="" />
            </Link>
            <div className="flex flex-col gap-2 top-10 right-10 bg-white shadow-md p-5 font-roboto-condensed w-fit h-fit z-20">
                {error && (
                    <p className="h-99 w-99 break-words max-w-[300px] text-red-500">
                        {error}
                    </p>
                )}
                <h2 className="font-bold text-[24px] py-5">Iniciar Sesion</h2>
                <form
                    onSubmit={onSubmit}
                    className="w-fit h-full flex flex-col justify-around gap-3"
                    action=""
                >
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="user">Usuario</label>
                            <input
                                value={user}
                                onChange={(ev) => setUser(ev.target.value)}
                                className="w-[328px] h-[45px] border pl-2"
                                type="text"
                                name="user"
                                id="user"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                value={password}
                                onChange={(ev) => setPassword(ev.target.value)}
                                className="w-[328px] h-[45px] border pl-2"
                                type="password"
                                name="password"
                                id="password"
                                required
                            />
                        </div>
                    </div>

                    <button
                        className={`w-[325px] h-[47px] bg-primary-red text-white self-center my-5 ${
                            submiting ? "bg-gray-500" : ""
                        }`}
                        type="submit"
                    >
                        {submiting ? "INICIANDO SESION..." : "INICIAR SESION"}
                    </button>
                </form>
                <div className="flex flex-col items-center">
                    <p>¿No tenes usuario?</p>
                    <Link className="text-primary-red" to={"/registro"}>
                        REGISTRATE
                    </Link>
                </div>
            </div>
        </div>
    );
}
