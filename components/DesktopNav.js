import { useState, useEffect, useContext } from "react";
import { Menu } from "antd";
import Link from "next/link";


import {
  AppstoreOutlined,
  CoffeeOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
  CarryOutOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Context } from "../context";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";


const DesktopNav = () => {
    const [current, setCurrent] = useState("");
    const { state, dispatch } = useContext(Context);
    const { user } = state;
  
    const router = useRouter();

    useEffect(() => {
        process.browser && setCurrent(window.location.pathname);
    }, [process.browser && window.location.pathname]);


    const logout = async () => {
        dispatch({ type: "LOGOUT" });
        window.localStorage.removeItem("user");
        const { data } = await axios.get("/api/logout");
        toast(data.message);
        router.push("/login");
    };


    return (
        <>
        <div>
            <header class="cd-header">
                <div class="header-wrapper">
                    <div class="logo-wrap">
                        <a style={{ fontSize: "10px" }}href="/" class="hover-target"><span>ArtMasters</span>Acdemy</a>
                       
                    </div>
                </div>
            </header>
            <div className="navbar" style={{ justifyContent: "center" }}>
                <div className="navbar_content">
 
                    <ul className="navbar_list center" style={{ display: "flex", flexDirection: "row"}}>
                        <li class="navbar__list-item"><a href="" class="hover-target">Online Courses</a></li>
                        <li class="navbar__list-item"><a href="" class="hover-target">Offline Courses</a></li>
                        <li class="navbar__list-item"><a href="" class="hover-target">Live Sessions</a></li>
                        <li class="navbar__list-item"><a href="" class="hover-target">About</a></li>
                    </ul>
                    <ul className="navbar_list right">
                        {user && (
                            <>
                                <li class="navbar__list-item"><a href="/login" class="hover-target">Login</a></li>
                                <li class="navbar__list-item"><a href="/register" class="hover-target">Register</a></li>
                            </>
                        )}
                        {user !== null && (
                            <>
                                <li class="navbar__list-item"><a href="" class="hover-target">Logout</a></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
        </>
    )
} 

export default DesktopNav;