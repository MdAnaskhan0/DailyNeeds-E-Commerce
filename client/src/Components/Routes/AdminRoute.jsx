import { useState, useEffect } from "react";
import { useAuth } from "../../Context/Auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function AdminRoute() {
    const [ok, setOK] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get("/api/v1/auth/admin-auth");
            // console.log(res)
            if (res.status == 200 && auth?.user?.role === 1) {
                setOK(true);
            } else {
                setOK(false);
            }
        };
        if (auth?.token) authCheck();
    }, [auth?.token]);



    return ok ? <Outlet /> : <Spinner path=""/>;
}
