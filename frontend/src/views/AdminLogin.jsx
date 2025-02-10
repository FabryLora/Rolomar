import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import rolomarLogo from "../assets/logos/logo-secundario.png";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";

export default function AdminLogin() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [login, setLogin] = useState(false);
    const { adminToken, setAdminToken } = useStateContext();

    const onSubmit = async (ev) => {
        ev.preventDefault();
        setLogin(true);
        try {
            const { data } = await axiosClient.post("/login-admin", {
                name: user,
                password: password,
            });

            setAdminToken(data.adminToken);
        } catch (error) {
            console.error(error);
            setError("Usuario o contraseña incorrectos");
        } finally {
            setLogin(false);
        }
    };

    if (adminToken) {
        return <Navigate to={"/dashboard"} />;
    }

    return (
        <div className="flex flex-col gap-10 justify-center items-center w-screen h-screen bg-black bg-opacity-50 fixed top-0 left-0 z-10">
            <Link to={"/"}>
                <img src={rolomarLogo} alt="" />
            </Link>
            <div className="flex flex-col gap-2 top-10 right-10 bg-white shadow-md p-5 font-roboto-condensed w-fit h-fit z-20">
                {error && (
                    <div className="bg-red-500 text-white text-center p-2 rounded-md">
                        {error}
                    </div>
                )}
                <h2 className="font-bold text-base py-5">
                    Iniciar Sesion {"(ADMINISTRADOR)"}
                </h2>
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
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="password">Contrasñe</label>
                            <input
                                value={password}
                                onChange={(ev) => setPassword(ev.target.value)}
                                className="w-[328px] h-[45px] border pl-2"
                                type="password"
                                name="password"
                                id="password"
                            />
                        </div>
                    </div>

                    <button
                        className="w-[325px] h-[47px] bg-primary-red text-white self-center my-5"
                        type="submit"
                    >
                        {login ? "Iniciando Sesion..." : "Iniciar Sesion"}
                    </button>
                </form>
            </div>
        </div>
    );
}
