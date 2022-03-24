import axios from 'axios'

import store from '../store'

import BaseSetting from '../config'
import url from '../api/config'
import TYPES from '../types'

/**
 * class for for network client layer
 * @counterDownload handle dispose stack limit request download
 * @counterUpload handle dispose stack limit request upload
 * @class Api
 */

const getSession = () => store.getState()?.auth?.auth

class Api {
    constructor() {
        this.counterDownload = 0
        this.counterUpload = 0
        this.uniqueRequest = {}
        this.network = this.setupInterceptors()
        this.trick = this.trickSetupInterceptors() // ===== REMOVE ON PRODUCTION ======
        this.headers = this.setupHeader()
    }

    refreshToken = async (error) => {
        const session = getSession()
        const originalRequest = error.config
        await axios
            .post(BaseSetting?.domain + url.refreshToken, {
                refreshToken: session?.refreshToken,
            })
            .then((response) => {
                store.dispatch({
                    type: TYPES.AUTH.LOGIN_SUCCESS,
                    payload: { ...session, token: response?.data?.token },
                })
                error.response.config.headers['Authorization'] =
                    response?.data?.token
                return axios(error.response.config)
            })
            .catch((error) => {
                console.log('Error ========>', error)
                return Promise.reject(error)
            })
    }

    /**
     * setup headers
     * @return {*}
     * @memberof Api
     */
    setupHeader(session) {
        let headers = {}

        headers['Content-Type'] = 'application/json'

        if (session?.token) {
            headers['Authorization'] = `${session.token}`
        }
        return headers
    }

    /**
     * setup  axios
     *
     * @returns
     * @memberof Api
     */
    setupInterceptors() {
        const api = axios.create({})

        api.interceptors.request.use(
            (config) => {
                console.log('Before Request >>>', config)
                const session = getSession()
                console.log('session', session)

                config.url = BaseSetting?.domain + config.url
                config.timeout = BaseSetting.sessionTimeoutThreshold * 1000
                const headers = this.setupHeader(session)
                config.headers = { ...config.headers, ...headers }

                return config
            },
            (error) => {
                console.log('Error Request >>>', error)
                return Promise.reject(error)
            }
        )

        api.interceptors.response.use(
            (response) => {
                console.log('After Request >>>', response)
                return response
            },
            (error) => {
                console.log('Error response >>>', error.message)
                const session = getSession()
                console.log('session', session)

                if (session?.refreshToken) {
                    this.refreshToken(error)
                }
                // if (!axios.isCancel(error)) {
                //   if (error?.config?.reload) {
                //     error?.config?.reload?.();
                //   } else {
                //   }
                // }

                // Do something with response error

                // return Promise.reject(error);
            }
        )
        return api
    }

    /**
     * ===== REMOVE ON PRODUCTION ======
     * setup axios for trick
     * why need ? because custom domain laravel server not have ngw folder for sign groupware
     * http://global3.hanbiro.com/php7/hanbiro/hhr/public login at http://global3.hanbiro.com/ngw/sign
     * the trick used for force domain to http://global3.hanbiro.com/ngw for login
     * @returns
     * @memberof Api
     */
    trickSetupInterceptors() {
        const api = axios.create({})

        api.interceptors.request.use(
            (config) => {
                console.log('Before Request >>>', config)
                const session = getSession()
                // if (!config.url.startsWith("http")) {
                //   config.url = `${session.url?.protocol}//${session.url?.hostname}${BaseSetting.url.path}${config.url}`;
                // }
                config.url = BaseSetting?.domain
                // Add more header setting for mobile app
                config.timeout = BaseSetting.sessionTimeoutThreshold * 1000
                const headers = this.setupHeader(session)
                config.headers = { ...config.headers, ...headers }

                // Inject device id & mobile's token
                // switch (config.method) {
                //   case "get":
                //     config.params["device_id"] = session?.device?.device_id;
                //     break;
                //   case "post":
                //     config.data["device_id"] = session?.device?.device_id;
                //     if (config.headers["Content-Type"] != "multipart/form-data") {
                //       config.data = qs.stringify(config.data);
                //     }
                //     break;
                //   default:
                //     break;
                // }

                //get config
                return config
            },
            (error) => {
                console.log('Error Request >>>', error)
                return Promise.reject(error)
            }
        )

        api.interceptors.response.use(
            (response) => {
                console.log('After Request >>>', response)
                return response
            },
            (error) => {
                console.log('Error response >>>', error.message)
                if (!axios.isCancel(error)) {
                    if (error?.config?.reload) {
                        error?.config?.reload?.()
                    } else {
                        // Snackbar.show({
                        //   text: i18n.t("common.cannot_connect_to_server"),
                        //   duration: Snackbar.LENGTH_SHORT,
                        // });
                    }
                }

                // Do something with response error
                return Promise.reject(error)
            }
        )
        return api
    }

    /**
     * Cancel one request
     *
     * @param {*} key
     * @memberof Api
     */
    cancelRequest(key) {
        if (this.uniqueRequest?.[key]) {
            console.log('Cancel request key', key)
            this.uniqueRequest[key]?.cancel()
        }
    }

    /**
     *
     * remove one request
     * @param {*} key
     * @memberof Api
     */
    removeTokenRequest(key) {
        if (this.uniqueRequest?.[key]) {
            this.uniqueRequest[key] = null
        }
    }

    /**
     * Get Method
     * @param {*} endPoint
     * @param {*} {params, headers, uniqueRequest, reload, responseType}
     * @return {*}
     * @memberof Api
     */
    async get(
        endPoint,
        { params, headers, uniqueRequest, reload, responseType }
    ) {
        let cancelToken
        if (uniqueRequest) {
            this.cancelRequest(uniqueRequest)
            cancelToken = axios.CancelToken.source()
            this.uniqueRequest[uniqueRequest] = cancelToken
        }
        try {
            const response = await this.network({
                method: 'get',
                url: endPoint + params,
                // params: params ?? {},
                headers: headers ?? {},
                responseType: responseType ?? 'json',
                cancelToken: cancelToken?.token,
            })
            this.removeTokenRequest(uniqueRequest)
            return Promise.resolve(response.data)
        } catch (error) {
            this.removeTokenRequest(uniqueRequest)
            return Promise.reject(error)
        }
    }

    /**
     * Post Method
     * @param {*} endPoint
     * @param {*} {params, headers, uniqueRequest, reload}
     * @return {*}
     * @memberof Api
     */
    async post(endPoint, { params, headers, uniqueRequest, reload }) {
        console.log('endPoint', endPoint)
        let cancelToken
        if (uniqueRequest) {
            this.cancelRequest(uniqueRequest)
            cancelToken = axios.CancelToken.source()
            this.uniqueRequest[uniqueRequest] = cancelToken
        }
        // ===== REMOVE ON PRODUCTION ======
        // if (endPoint == "/sign/auth") {
        //   try {
        //     const response = await this.trick({
        //       method: "post",
        //       url: endPoint,
        //       data: params ?? {},
        //       cancelToken: cancelToken?.token,
        //       headers: headers ?? {},
        //       reload,
        //     });
        //     this.removeTokenRequest(uniqueRequest);
        //     return Promise.resolve(response.data);
        //   } catch (error) {
        //     this.removeTokenRequest(uniqueRequest);
        //     return Promise.reject(error);
        //   }
        // }
        // ======= END =============
        try {
            const response = await this.network({
                method: 'post',
                url: endPoint,
                data: params ?? {},
                cancelToken: cancelToken?.token,
                headers: headers ?? {},
                reload,
            })
            this.removeTokenRequest(uniqueRequest)
            return Promise.resolve(response.data)
        } catch (error) {
            this.removeTokenRequest(uniqueRequest)
            return Promise.reject(error)
        }
    }

    /**
     * @description download func
     * @author @author Wem <dung.huynh@hanbiro.com>
     * @date 2020-06-15
     * @param {*} endPoint
     * @param {*} params
     * @param {*} headers
     * @param {*} uniqueRequest
     * @param {*} destPath
     * @returns
     * @memberof Api
     */
    //   async download(
    //     endPoint,
    //     { params, headers, uniqueRequest, fileName, callback }
    //   ) {
    //     const pathFile = Platform.select({
    //       ios: RNFetchBlob.fs.dirs.DocumentDir,
    //       android: RNFetchBlob.fs.dirs.DownloadDir,
    //     });
    //     const session = getSession();
    //     const downloadLink = `http://global3.hanbiro.com/php7/rain/laravel/public/api/holiday/request/download?vrf_cn=102&vrf_id=40`; //`${url.format(session.url)}/${endPoint}`;
    //     const downloadHeader = { ...this.setupHeader(session), ...headers };
    //     const setupConfig = RNFetchBlob.config({
    //       fileCache: true,
    //       path: [pathFile, encodeURI(fileName ?? Date.now())].join("/"),
    //       trusty: true,
    //     });
    //     const request = setupConfig.fetch(
    //       "GET",
    //       downloadLink,
    //       downloadHeader,
    //       params
    //     );
    //     if (uniqueRequest) {
    //       this.cancelRequest(uniqueRequest);
    //       this.uniqueRequest[uniqueRequest] = request;
    //     }
    //     return request
    //       .progress((received, total) => {
    //         const percent = ((received / total) * 100).toFixed(2);
    //         callback?.(percent);
    //       })
    //       .then((response) => {
    //         this.removeTokenRequest(uniqueRequest);
    //         return Promise.resolve({ percent: 100, path: response.data });
    //       })
    //       .catch((err) => {
    //         console.log("error", err);
    //         this.removeTokenRequest(uniqueRequest);
    //         return Promise.reject(error);
    //       });
    //   }
}

const _API = new Api()

console.log('_API', _API)
export default _API
