import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Input } from "antd";

import Message from "../../components/Message";

import actions from "../../actions";

export default function Login() {
  const dispatch = useDispatch();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [errorLogin, setErrorLogin] = useState(null);

  const callbackLogin = (res) => {
    setLoadingLogin(false);
    if (!res.success) {
      setErrorLogin(res.message);
    } else {
      setErrorLogin(null);
    }
  };

  const onSubmit = () => {
    setLoadingLogin(true);
    dispatch(
      actions.auth.loginAction(
        {
          username,
          password,
          platform: "erp",
        },
        callbackLogin
      )
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSubmit();
    }
  };
  return (
    <div className="w-full flex flex-wrap">
      <div
        className="w-full md:w-1/2 sm:w-full flex flex-col"
        style={{ backgroundColor: "#1a94ff" }}
      >
        <div className="flex justify-center md:justify-center pt-20 md:-mb-24"></div>

        <div className="flex flex-col justify-center items-center md:justify-center my-auto pt-12 md:pt-0 px-8 md:px-24 lg:px-32">
          <img
            src={
              "https://salt.tikicdn.com/ts/upload/ae/f5/15/2228f38cf84d1b8451bb49e2c4537081.png"
            }
            alt="Logo"
            className="h-2/6 w-1/6"
          />
          <p className="text-center text-3xl text-white">Next-Inventory.</p>
          <form className="flex flex-col w-4/6 p-4 rounded md:pt-8 bg-white ">
            <div className="flex flex-col">
              <Input
                type="text"
                placeholder="Tài khoản"
                onChange={(event) => setUserName(event?.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loadingLogin}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                status={errorLogin ? "error" : ""}
              />
            </div>

            <div className="flex flex-col pt-4">
              <Input
                placeholder="Mật khẩu"
                type="password"
                onChange={(event) => setPassword(event?.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loadingLogin}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                status={errorLogin ? "error" : ""}
              />
            </div>

            <Message
              show={errorLogin}
              className="transition-all ease-in-out delay-150 flex justify-center pt-4 center"
              type="danger"
            >
              {errorLogin}
            </Message>

            <Button
              onClick={onSubmit}
              type="primary"
              loading={loadingLogin}
              className="mt-8"
            >
              Log In
            </Button>
            {/* <input
              type="submit"
              value="Log In"
              style={{ backgroundColor: "#1a94ff" }}
              className="rounded  text-white font-bold text-lg cursor-pointer hover:bg-gray-700 p-2 mt-8"
            /> */}
          </form>
        </div>
      </div>

      <div className="flex justify-center items-center h-screen p-30 md:w-1/2 sm:w-0 shadow-2xl ">
        <img
          className="object-cover hidden h-3/6 md:block"
          src="https://salt.tikicdn.com/ts/upload/f7/ef/8f/b3f79756fd11db92a01c1bdfdc06b8a0.png"
        />
      </div>
    </div>
  );
}
