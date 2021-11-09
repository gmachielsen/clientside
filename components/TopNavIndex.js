import { useState, useEffect, useContext } from "react";
import { Menu } from "antd";
import Link from "next/link";


import {
UserOutlined
} from "@ant-design/icons";
import { Context } from "../context";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const { Item, SubMenu, ItemGroup } = Menu;

const TopNavIndex = () => {
  const [current, setCurrent] = useState("");
  const [displayNav, setDisplayNav] = useState(false);
  const { state, dispatch } = useContext(Context);
  const { user } = state;

  const router = useRouter();

  // useEffect(() => {
  //   process.browser && setCurrent(window.location.pathname);
  // }, [process.browser && window.location.pathname]);

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    toast(data.message);
    router.push("/login");
  };

  const handleClick = () => {
    if (displayNav == false) {
      setDisplayNav(true);
      const h1 = document.querySelector("h1");
      h1.style.visibility = "hidden";
      h1.style.opacity = 0;
      h1.style.transition = "visibility 2s, opacity 0.2s linear"
      // h1.style.transition = "all 2s ease-in-out";
      // h1.style.display = "none";
      document.body.classList.add("nav-active");
      // console.log(displayNav);
    } else {
      setDisplayNav(false);
      document.body.classList.remove('nav-active');
      const h1 = document.querySelector("h1");
      // h1.style.display = "";
      h1.style.visibility = "visible";
      h1.style.opacity = 1;
      h1.style.transition = "visibility 2s, opacity 1s linear"
      // console.log(displayNav);
    }
  }
 
  return (
    <>
    <header class="cd-header">
      <div class="header-wrapper">
        <div class="logo-wrap">
          <a style={{ fontSize: "10px" }}href="/" class="hover-target"><span>ArtMasters</span>Acdemy</a>
        </div>
        <div class="nav-but-wrap">
          <button class="hamburger" onClick={handleClick}>
            <div class="menu-icon hover-target">
              <span class="menu-icon__line menu-icon__line-left"></span>
              <span class="menu-icon__line"></span>
              <span class="menu-icon__line menu-icon__line-right"></span>
            </div>
          </button>
        </div>
      </div>
    </header>
      <div class="nav">
        <div class="nav__content">
          <ul class="nav__list">
            {/* <li class="nav__list-item active-nav"><a href="/" class="hover-target">Home</a></li> */}
            {user === null && (
              <>
                <li class="nav__list-item"><a href="/login" class="hover-target">Login</a></li>
                <li class="nav__list-item"><a href="/register" class="hover-target">Register</a></li>
              </>
            )}
            {user !== null && (
                            <>
                                <div class="dropdown">
                                    <span style={{ color: "white" }}><UserOutlined style={{ marginRight: "10px", marginBottom: "10px" }}/> {user && user.name}</span>
                                      <li class="nav__list-item"><a href="/user" class="hover-target">Dashboard</a></li>

                                     
                                        {user && user.role && user.role.includes("Instructor") && (
                                        <>
                                            <li class="nav__list-item"><a href="/instructor" class="hover-target">Instructor</a></li>
                                            </>  
                                        ) }
                                        {user && user.role && user.role.includes("Admin") && (
                                        <>
                                          <li class="nav__list-item"><a href="/admin" class="hover-target">Admin</a></li>
                                        </>  
                                        ) }
                                                            
                                </div>
                                {/* <li class="navbar__list-item"><a href="" style={{ padding: "75px", color: "white"}} class="hover-target" onClick={logout}>Logout</a></li> */}
                            </>
                        )}
            <br />
            <br />
            <li class="nav__list-item"><a href="/courses" class="hover-target">Online Courses</a></li>
            <li class="nav__list-item"><a href="" class="hover-target">Offline Courses</a></li>
            <li class="nav__list-item"><a href="" class="hover-target">Live Sessions</a></li>
            <li class="nav__list-item"><a href="" class="hover-target">About</a></li>
            {user !== null && (
              <>
                <li class="nav__list-item"><a href="" class="hover-target" onClick={logout}>Logout</a></li>
              </>
            )}

          </ul>
        </div>
      </div>
      </>
  );
};

export default TopNavIndex;