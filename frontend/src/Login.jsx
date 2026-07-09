import Insta from "./assets/Insta.webp";
import Image2 from "./assets/Image2.jpg";
import Image1 from "./assets/Image1.jpg";
import Image3 from "./assets/Image3.jpg";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { AuthLogin } from "./Services/auth.js";
import { useState, useRef, useEffect } from "react";
import { Spin } from "antd";
const BASE_URL = `${import.meta.env.VITE_API_URL}/posts`;
const Login = () => {
   console.log(`${import.meta.env.VITE_API_URL}/users/`)
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [flag, setFlag] = useState(true);
  const [flag2, setFlag2] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading] = useState(false);
  const getName = (e) => {
    setName(e.target.value);
  };

  const getPassword = (e) => {
    setPassword(e.target.value);
  };
  async function signup(e) {
    e.preventDefault();
    setLoading(true);
    const message = await AuthLogin(name, password, email, false, navigate);
    if (message) {
      setLoading(false);
    }
    setFlag(false);
    setFlag2(false);
    console.log(message.detail);
    setFlag2(false);
    setName("");
    setPassword("");
    setEmail("");
    setFlag(false);
  }

  async function login(e) {

    e.preventDefault();
    const message = await AuthLogin(name, password, email, flag, navigate);
    console.log(message);
    if (message.detail) {
      setLoading(false);
    }
    setName("");
    setPassword("");
    setEmail("");
    setFlag(true);
  }
  return (
    <>
      <div className="alignment">
        <div className="layout flex flex-col">
          <img src={Insta} className="sm:h-30 sm:w-30 sm:p-2 h-20 w-20 p-2" />
          <p className="sm:text-4xl font-serif sm:pl-20 whitespace-nowrap sm:m-1 text-2xl pl-5 m-1">
            See everyday moments from your
          </p>
          <p className="gradientText sm:text-6xl sm:font-medium font-serif sm:ml-20 text-4xl ml-5">
            close friends
          </p>
          <div
            style={{ position: "relative" }}
            className="LoginImages sm:mt-30"
          >
            <img
              src={Image3}
              className="image sm:mt-5 sm:h-90 sm:w-50 rounded-2xl absolute sm:ml-30 sm:-rotate-10 "
            />
            <img
              src={Image1}
              className="image sm:mt-5 sm:h-90 sm:w-60 rounded-2xl absolute sm:ml-75 sm:rotate-10 "
            />
            <img
              src={Image2}
              className="image  sm:h-100 sm:w-60 rounded-2xl absolute sm:ml-55 "
            />
          </div>
        </div>
        <div className="sm:mx-50 sm:mt-20 p-4 mt-20 flex flex-col justify-center items-center">
          <form onSubmit={login} className="flex flex-col ">
            <p className="sm:text-4xl sm:ml-1 mb-4 text-2xl gradientText font-sans sm:mb-2 ">
              Login to Instagram Account
            </p>
            <input
              type="text"
              onChange={getName}
              value={name}
              placeholder="Enter valid userName to login"
              className="border-2  border-gray-500 p-2 text-2 rounded-xl sm:p-5 w-80 m-3 sm:text-[1em] text-gray-600 sm:rounded-2xl sm:w-[25em]  sm:m-5"
            />
            {flag2 && (
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                value={email}
                placeholder="Enter valid email to login"
                className="border-2  border-gray-500 p-2 text-2 rounded-xl sm:p-5 w-80 m-3 sm:text-[1em] text-gray-600 sm:rounded-2xl sm:w-[25em]  sm:m-5"
              />
            )}
            <input
              type="password"
              onChange={getPassword}
              value={password}
              placeholder="Enter your password.."
              className="border-2  border-gray-500 p-2 text-2 rounded-xl sm:p-5 w-80 m-3 sm:text-[1em] text-gray-600 sm:rounded-2xl sm:w-[25em]  sm:m-5"
            />
            <p
              className="sm:text-[18px] text-blue-600 sm:ml-[1em] sm:pl-[1em]"
              onClick={() => setFlag2(!flag2)}
            >
              create a new account
            </p>

            <br />
            <div>
              {" "}
              <button
                onClick={() => {
                  setFlag(true);
                  setLoading(true);
                }}
                type="submit"
                style={{
                  border: "0.2em solid",
                  borderImage: "linear-gradient(to right, red, blue) 1",
                  borderRadius: "1em",
                }}
                className="text-2xl h-14 w-30"
              >
                Login
              </button>
              <button
                type="button"
                onClick={signup}
                style={
                  !flag2
                    ? {
                        margin: "0em 1em 1em 1em",
                        padding: "0.4em 1em ",
                        backgroundColor: "white",
                        border: "0.2em solid",
                        borderImage: "linear-gradient(to right,#fbc,#bcf) 1",
                        color: "#848181",
                        fontSize: "1em",
                        borderRadius: "1em",
                      }
                    : {
                        margin: "0em 1em 1em 1em",
                        padding: "0.4em 1em ",
                        backgroundColor: "white",
                        border: "0.2em solid",
                        borderImage: "linear-gradient(to right, red, blue) 1",
                        color: "black",
                        fontSize: "1em",
                        borderRadius: "1em",
                      }
                }
                className="text-2xl h-14 w-30"
                disabled={flag2 ? false : true}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
      {loading && (
        <div className="fixed inset-0 bg-[#ffffff9e] ">
          <div className="sm:mt-100 mt-40 ml-20 sm:ml-190">
            <Spin size="large" tip="Loading..." />
          </div>
        </div>
      )}
    </>
  );
};
export default Login;
