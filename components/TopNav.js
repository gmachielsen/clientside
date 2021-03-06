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
  UserOutlined,
} from "@ant-design/icons";
import { Context } from "../context";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const { Item, SubMenu, ItemGroup } = Menu;

const TopNav = () => {
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
    <Menu mode="horizontal" selectedKeys={[current]} className="mb-2" style={{ border: "none", paddingTop: "10px"}}>
      <Item
        key="/"
        onClick={(e) => setCurrent(e.key)}
      >
        <Link href="/">
                        <a style={{ fontSize: "10px", color: "black" }}href="/" class="hover-target"><span>ArtMasters</span>Academy</a>
                       
        </Link>
      </Item>

      {user && user.role && user.role.includes("Instructor") ? (
               <Item
               key="/instructor/course/create"
               onClick={(e) => setCurrent(e.key)}
              //  icon={<CarryOutOutlined />}
             >
               <Link href="/instructor/course/create">
                 <a>Create Course</a>
               </Link>
             </Item>
            ) : (
            <Item
              key="/user/become-instructor"
              onClick={(e) => setCurrent(e.key)}
              // icon={<TeamOutlined />}
            >
              <Link href="/user/become-instructor">
                <a>Become Instructor</a>
              </Link>
            </Item>
        )}
        
        {user && user.role && user.role.includes("Admin") && (
          <Item
          key="/admin"
               onClick={(e) => setCurrent(e.key)}
          >
              <Link href="/admin">
                 <a>Admin</a>
               </Link>
          
          </Item>
        )}
        
    
    { user && user.role && user.role.includes("Instructor") && (
      <Item
        key="/instructor"
        onClick={(e) => setCurrent(e.key)}
        // icon={<TeamOutlined />}
        className="float-right"
      >
        <Link href="/instructor">
          <a>Instructor</a>
        </Link>
      </Item>
    )}

     {user === null && (
       <>
        <Item
          key="/login"
          onClick={(e) => setCurrent(e.key)}
          icon={<LoginOutlined />}
        >
          <Link href="/login">
            <a>Login</a>
          </Link>
        </Item>

        <Item
          key="/register"
          onClick={(e) => setCurrent(e.key)}
          icon={<UserAddOutlined />}
        >
          <Link href="/register">
            <a>Register</a>
          </Link>
        </Item>
       </>
     )}

      {user !== null && (
        <SubMenu icon={<UserOutlined />} title={user && user.name} className="float-right">
            <ItemGroup>
              <Item key="/user">
                <Link href="/user">
                  <a>Dashboard</a>
                </Link>
              </Item>
              <Item onClick={logout} icon={<LogoutOutlined />} className="float-right" style={{}}>
                Logout
              </Item>
            </ItemGroup>
        </SubMenu>
      )}
    </Menu>
  );
};

export default TopNav;