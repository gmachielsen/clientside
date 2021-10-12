import { useState, useEffect, useContext } from "react";
import { Menu } from "antd";
import Link from "next/link";
import jQuery from 'jquery';

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

const { Item, SubMenu, ItemGroup } = Menu;

const TopNavIndex = () => {
  const [current, setCurrent] = useState("");

  const { state, dispatch } = useContext(Context);
  const { user } = state;

  const router = useRouter();

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);

      (function($) { "use strict";
      var app = function () {
          var body = undefined;
          var menu = undefined;
          var menuItems = undefined;
          var init = function init() {
              body = document.querySelector('body');
              menu = document.querySelector('.menu-icon');
              menuItems = document.querySelectorAll('.nav__list-item');
              applyListeners();
          };
          var applyListeners = function applyListeners() {
              menu.addEventListener('click', function () {
                  return toggleClass(body, 'nav-active');
              });
          };
          var toggleClass = function toggleClass(element, stringClass) {
              if (element.classList.contains(stringClass)) element.classList.remove(stringClass);else element.classList.add(stringClass);
          };
          init();
      }();
      
  })(jQuery);

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
    <header class="cd-header">
      <div class="header-wrapper">
        <div class="logo-wrap">
          <a href="/" class="hover-target"><span>ArtMasters</span>Acdemy</a>
        </div>
        <div class="nav-but-wrap">
          <div class="menu-icon hover-target">
            <span class="menu-icon__line menu-icon__line-left"></span>
            <span class="menu-icon__line"></span>
            <span class="menu-icon__line menu-icon__line-right"></span>
          </div>
        </div>
      </div>
    </header><div class="nav">
        <div class="nav__content">
          <ul class="nav__list">
            <li class="nav__list-item active-nav"><a href="/" class="hover-target">Home</a></li>
            <li class="nav__list-item"><a href="" class="hover-target">Diensten</a></li>
            <li class="nav__list-item"><a href="" class="hover-target">Ons werk</a></li>
            <li class="nav__list-item"><a href="" class="hover-target">Contact</a></li>
          </ul>
          <ul>
            <a href="#" onclick="return true"><i class="fab fa-whatsapp fa-2x"></i></a>
            <a href="#" onclick="return true"><i class="fas fa-phone fa-2x"></i></a>
            <a href="#" onclick="return true"><i class="fas fa-envelope-square fa-2x"></i></a>
          </ul>
        </div>
      </div>
      </>
      
    // <Menu mode="horizontal" selectedKeys={[current]} className="mb-2" style={{ background: "transparent", color: "antiquewhite", border: "0", fontSize: "21px!important", marginTop: "10px", marginLeft: "10px", textDecoration: "none" }}>
    //   <Item
    //     key="/"
    //     onClick={(e) => setCurrent(e.key)}
    //     // icon={<AppstoreOutlined />}
    //   >
    //     <Link href="/">
    //       <a>App</a>
    //     </Link>
    //   </Item>

    //   {user && user.role && user.role.includes("Instructor") ? (
    //            <Item
    //            key="/instructor/course/create"
    //            onClick={(e) => setCurrent(e.key)}
    //           //  icon={<CarryOutOutlined />}
    //          >
    //            <Link href="/instructor/course/create">
    //              <a style={{ color: "antiquewhite" }}>Create Course</a>
    //            </Link>
    //          </Item>
    //         ) : (
    //         <Item
    //           key="/user/become-instructor"
    //           onClick={(e) => setCurrent(e.key)}
    //           // icon={<TeamOutlined />}
    //         >
    //           <Link href="/user/become-instructor">
    //             <a style={{ color: "antiquewhite" }}>Become Instructor</a>
    //           </Link>
    //         </Item>
    //     )}
    
    // { user && user.role && user.role.includes("Instructor") && (
    //   <Item
    //     key="/instructor"
    //     onClick={(e) => setCurrent(e.key)}
    //     // icon={<TeamOutlined />}
    //     className="float-right"
    //   >
    //     <Link href="/instructor">
    //       <a style={{ color: "antiquewhite" }}>Instructor</a>
    //     </Link>
    //   </Item>
    // )}

    //  {user === null && (
    //    <>
    //     <Item
    //       key="/login"
    //       onClick={(e) => setCurrent(e.key)}
    //       // icon={<LoginOutlined />}
    //     >
    //       <Link href="/login">
    //         <a style={{ color: "antiquewhite" }}>Login</a>
    //       </Link>
    //     </Item>

    //     <Item
    //       key="/register"
    //       onClick={(e) => setCurrent(e.key)}
    //       // icon={<UserAddOutlined />}
    //     >
    //       <Link href="/register">
    //         <a style={{ color: "antiquewhite" }}>Register</a>
    //       </Link>
    //     </Item>
    //    </>
    //  )}

    //   {user !== null && (
    //     <SubMenu title={user && user.name} className="float-right">
    //         <ItemGroup>
    //           <Item key="/user">
    //             <Link href="/user">
    //               <a>Dashboard</a>
    //             </Link>
    //           </Item>
    //           <Item onClick={logout} className="float-right" style={{}}>
    //             Logout
    //           </Item>
    //         </ItemGroup>
    //     </SubMenu>
    //   )}
    // </Menu>
  );
};

export default TopNavIndex;