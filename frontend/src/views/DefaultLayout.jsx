import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function DefaultLayout() {
    return (
        <div>
            <NavBar />

            <Outlet />
        </div>
    );
}
