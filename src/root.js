import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import { authSelector } from "./selector";

import Login from "./screen/Login";
import Main from "./screen/Main";

export default function Root() {
  const authSelect = useSelector(authSelector);

  const buildApplication = () => {
    if (authSelect) {
      return (
        <Routes>
          <Route path="*" element={<Main />} />
        </Routes>
      );
    }

    return (
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    );
  };

  return buildApplication();
}
