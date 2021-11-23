import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import {useRouter} from 'next/router';
import { Button } from "antd";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import GoogleLogin from 'react-google-login';



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // (global)state
  const { state, dispatch } = useContext(Context);
  const { user } = state;

  // router
  const router = useRouter();

  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  console.log("STATE", state);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table({ name, email, password });
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/login`, {
        email,
        password,
      });
    //   console.log("LOGIN RESPONSE", data);
    dispatch({
        type: "LOGIN",
        payload: data,
    });
    // save in local storage
    window.localStorage.setItem("user", JSON.stringify(data));
    // redirect
    router.push("/user");
      // setLoading(false);
    } catch (err) {
      toast(err.response.data);
      setLoading(false);
    }
  };

  const googleLogin = async (response) => {
    console.log(response);
    console.log(response.profileObj.email, "email>????");
    try {
    const { data } =  await axios.post(`/api/google-login`, {
      idToken: response.tokenId,
      email: response.profileObj.email,
      name: response.zu.hf
    });
    dispatch({
      type: "LOGIN",
      payload: data,
    });
    // save in local storage
    window.localStorage.setItem("user", JSON.stringify(data));
    } catch (err) {
      console.log(err); 
    }
  }

  // const googleLogin = async () => {
  //   auth
  //     .signInWithPopup(googleAuthProvider)
  //     .then(async (result) => {
  //       const { user } = result;
  //       const idTokenResult = await user.getIdTokenResult();
  //       const authtoken = idTokenResult.token;
  //       const { data } = await axios.post(
  //         "/api/googlelogin",
  //         { user },
  //             {
  //                 headers: {
  //                 authtoken,
  //                 },
  //             }
  //         );
  
  //         dispatch({
  //           type: "LOGIN",
  //           payload: data,
  //         });
  
  //     // save in local storage
  //     window.localStorage.setItem("user", JSON.stringify(data));
  //       console.log(data, "ddataddtatddadatta");
  
  //       router.push("/");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       toast.error(err.message);
  //     });
  // };

  return (
    <>
    <div className="container">
    <br/>     
      <br/>
      <br/>
   
      <div className="row">
      
      <h1 className="text-center mt-6">Login</h1>

      <div className="container col-md-12 pb-5">
        <form onSubmit={handleSubmit} className="col-8 offset-2">
          <input
            type="email"
            className="form-control mb-4 p-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />

          <input
            type="password"
            className="form-control mb-4 p-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />

          <button
            type="submit"
            className="btn btn-block btn-primary"
            disabled={!email || !password || loading}
          >
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>
        <br />
        <br />
        {/* <Button
            onClick={googleLogin}
            type="danger"
            className="mb-3"
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="large"
            style={{ width: "67%", display: "block", margin: "auto" }}
          >
            Login with Google
          </Button> */}
          <GoogleLogin
                clientId="498376567191-q8j3fdje08d1fpbihvjjqi1srl2jjk5h.apps.googleusercontent.com"
                // buttonText="Login"
                onSuccess={googleLogin}
                onFailure={googleLogin}
                render={renderProps => (
                  <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className="btn btn-danger btn-lg btn-block"
                  >
                    <GoogleOutlined /> Login with Google
                  </button>
                )}
                // cookiePolicy={'single_host_origin'}
                style={{ width: "67%", display: "block", margin: "auto" }}
            />
            <div>{process.env.REACT_APP_GOOGLE_CLIENT_ID}</div>
        <p className="text-center pt-3">
          Not yet registered?{" "}
          <Link href="/register">
            <a>Register</a>
          </Link>
        </p>

        <p className="text-center text-danger">
          <Link href="/forgot-password">
            <a className="text-danger">Forgot password</a>
          </Link>
        </p>
      </div>
 

      </div>
      <br/>     
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>     
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>     
      <br/>
      <br/>
      <br/>
  
  
    </div>
     
    </>
  );
};

export default Login;