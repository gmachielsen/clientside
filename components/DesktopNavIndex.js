import { useState, useEffect, useContext } from "react";
import { Menu } from "antd";
import Link from "next/link";


import {
  AppstoreOutlined,
  CoffeeOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserOutlined,
  CarryOutOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Context } from "../context";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
const { Item, SubMenu, ItemGroup } = Menu;


const DesktopNavIndex = () => {
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
                        <a style={{ fontSize: "10px" }}href="/" class="hover-target"><span>ArtMasters</span>Academy</a>
                       
                    </div>
                </div>
            </header>
            <div className="navbar" style={{  }}>
                <div className="navbar_content" style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", width: "100%" }}>
 
                    <ul className="navbar_list center" style={{ justifyContent: "center", width: "calc(100% / 3)", padding: 0, margin: 0, display: "flex", flexDirection: "row", paddingTop: "40px", fontSize: "20px", color: "white", textDecoration: "none", listStyleType: "none", letterSpacing: "2px" }}>
                        <li class="navbar__list-item"><a href="" class="hover-target" style={{ padding: "15px", color: "white"}}>Online Courses</a></li>
                        <li class="navbar__list-item"><a href="" class="hover-target" style={{ padding: "15px", color: "white"}}>Offline Courses</a></li>
                        <li class="navbar__list-item"><a href="" class="hover-target" style={{ padding: "15px", color: "white"}}>Live Sessions</a></li>
                        <li class="navbar__list-item"><a href="" class="hover-target" style={{ padding: "15px", color: "white"}}>About</a></li>
                    </ul>
                    <ul className="navbar_list right" style={{ justifyContent: "flex-end", width: "calc(100% / 3)", display: "flex", flexDirection: "row", margin: 0, padding: 0, listStyleType: "none", paddingTop: "40px", fontSize: "20px"}}>
                        {user == null && (
                            <>
                                <li class="navbar__list-item"><a style={{ padding: "15px", color: "white"}} href="/login" class="hover-target">Login</a></li>
                                <li class="navbar__list-item"><a style={{ padding: "15px", color: "white", marginRight: "40px" }} href="/register" class="hover-target">Register</a></li>
                            </>
                        )}
                        {user !== null && (
                            <>
                                <div class="dropdown">
                                    <span style={{ color: "white" }}><UserOutlined style={{ marginRight: "10px", marginBottom: "10px" }}/> {user && user.name}</span>
                                    <div class="dropdown-content">
                                        <Link  href="/user">
                                                <a>Dashboard</a>
                                        </Link>
                                        {user && user.role && user.role.includes("Instructor") && (
                                        <>
                                        <hr />
                                            <Link href="/instructor">
                                                <a>Instructor</a>
                                            </Link></>  
                                        ) }
                                                            
                                    </div>
                                </div>
                                <li class="navbar__list-item"><a href="" style={{ padding: "75px", color: "white"}} class="hover-target" onClick={logout}>Logout</a></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
        </>
    )
} 

export default DesktopNavIndex;