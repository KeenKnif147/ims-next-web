import { camelizeKeys } from "humps";
import axios from "axios";
import ApiError from "../errors/ApiError";
import { getAuthInfoFromCookie } from "../utils/auth";

export const getApiRoot = () => {
  const OPS_API_ROOT =
    window._env_ &&
    typeof window._env_.FRONTEND_OPS_API_ROOT === "string" &&
    (window._env_.FRONTEND_OPS_API_ROOT.includes("http")
      ? window._env_.FRONTEND_OPS_API_ROOT
      : `https://${window._env_.FRONTEND_OPS_API_ROOT}`);

  if (!OPS_API_ROOT) {
    if (
      window.location.hostname === "inv.tiki.com.vn" ||
      window.location.hostname === "inv-staging.tiki.com.vn"
    ) {
      return "https://ops-api.tiki.vn";
    }

    if (
      window.location.hostname === "kiemke.tiki.services" ||
      window.location.hostname === "kiemke-staging.tiki.services"
    ) {
      return "http://ops-api.tiki.services:8000";
    }

    return "https://ops-api-test.tiki.vn";
  }

  return OPS_API_ROOT;
};


export const getTikiBackendRoot = () => {
    if (window.location.hostname === 'inv.tiki.com.vn' || window.location.hostname === 'inv-staging.tiki.com.vn') {
      return 'https://backend.tiki.vn'
    }
  
    return 'https://backend.tala.xyz'
  }
  
  export const getApiV2Root = () => {
    const OPS_API_V2_ROOT = window._env_ && typeof window._env_.FRONTEND_OPS_API_V2_ROOT === 'string'
    && (
      window._env_.FRONTEND_OPS_API_V2_ROOT.includes('http')
        ? window._env_.FRONTEND_OPS_API_V2_ROOT
        : `https://${window._env_.FRONTEND_OPS_API_V2_ROOT}`
    )
  
    if (OPS_API_V2_ROOT) return OPS_API_V2_ROOT
  
    if (['inv.tiki.com.vn', 'inv-staging.tiki.com.vn'].includes(window.location.hostname)) {
      return 'https://ops-apiv2.tiki.vn'
    }
  
    if (['kiemke.tiki.services', 'kiemke-staging.tiki.services'].includes(window.location.hostname)) {
      return 'http://vdc.ops-erza.tiki.services'
    }
  
    return 'https://ops-apiv2.tala.xyz'
  }
  
  export const apiV1AxiosInstance = axios.create({
    baseURL: getApiRoot(),
  })
  
  export const apiV2AxiosInstance = axios.create({
    baseURL: getApiV2Root(),
  })
  
  export const UPLOAD_ENDPOINT = `${getApiV2Root()}/inventory/upload2s3`
  export const getCurrentUserId = () => {
    const { user_id } = getAuthInfoFromCookie()
  
    if (!user_id) {
      throw new Error('User id not found in cookie')
    }
  
    return parseInt(user_id, 10)
  }
  
  export const formContentHeader = {
    'Content-Type': 'application/x-www-form-urlencoded',
  }
  
  export const formatApiResponse = res => {
    const result = camelizeKeys(res.data)
  
    if (result.isSuccess !== 1) {
      throw new ApiError({
        request: {
          body: res.config?.data,
          endpoint: res.config?.url,
          method: res.config?.method,
        },
        message: 'expected is_success = 1 ',
        response: result,
      })
    }
  
    delete result.isSuccess
    delete result.executionTime
  
    return result
  }
  
  export const handleApiFailed = error => {
    if (error instanceof ApiError) {
      throw error
    }
  
    throw new ApiError({
      ...camelizeKeys(error),
      request: {
        body: error.config?.data,
        endpoint: error.config?.url,
        method: error.config?.method,
      },
    })
  }
  
  export const normalizeProducts = products => {
    const normalize = ({
      msku,
      sellerSku,
      productName,
      productSize,
      productDimensions,
      ...rest
    }) => {
      const sanitized = { ...rest }
  
      if (msku) {
        sanitized.masterSku = msku
      }
  
      if (sellerSku) {
        sanitized.sku = sellerSku
      }
  
      if (productName) {
        sanitized.name = productName
      }
  
      if (productSize) {
        sanitized.size = productSize
      }
  
      if (productDimensions) {
        sanitized.dimensions = productDimensions
      }
  
      return sanitized
    }
  
    if (Array.isArray(products)) {
      return products.map(normalize)
    }
  
    return normalize(products)
  }