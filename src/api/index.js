import axios from "axios";
import encode from "form-urlencoded";
import { camelizeKeys } from "humps";

import url from "./config";
import api from "../services/network";
import ApiError from "../errors/ApiError";
import { getApiRoot, formContentHeader } from "./utils";

export const domain = "http://127.0.0.1:3001";
export const apiServices = {
  // authenticate: (params) => {
  //   return api.post(url?.auth, { params });
  // },
  // //DASHBOARD
  // //--admin
  // postRegister: async (params) => {
  //   const headers = {
  //     // "Content-Type": "application/x-www-form-urlencoded",
  //     "Content-Type": "application/json",
  //   };
  //   const res = await axios
  //     .post(domain + url.register, params, { headers })
  //     .then((response) => {
  //       console.log("Success ========>", response);
  //       return response;
  //     })
  //     .catch((error) => {
  //       console.log("Error ========>", error);
  //     });
  //   console.log("res", res);
  //   return res?.data;
  // },

  // login: async (params) => {
  //   const headers = {
  //     "Content-Type": "application/x-www-form-urlencoded",
  //   };
  //   // TODO: hard code, remove after
  //   const res = await axios
  //     .post("https://ops-api-test.tiki.vn/cpn/user" + url.login, params, {
  //       headers,
  //     })
  //     .then((response) => {
  //       console.log("Success ========>", response);
  //       return response;
  //     })
  //     .catch((error) => {
  //       console.log("Error ========>", error);
  //     });
  //   console.log("res", res);
  //   return res?.data;
  // },
  login: ({ username, password }) =>
    axios({
      url: `https://ops-api-test.tiki.vn/cpn/user/login`,
      data: encode({
        username,
        password,
        platform: "erp",
      }),
      headers: formContentHeader,
      method: "POST",
    })
      .then((res) => res.data) // Do not camelize because we need to in sync with v1
      .catch((error) => {
        console.log("call", error);

        throw new ApiError(camelizeKeys(error));
      }),

  saveSectionView: (params) => {
    return api.post(url?.saveSectionView, { params });
  },
};
