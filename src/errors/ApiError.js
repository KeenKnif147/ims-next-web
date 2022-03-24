export default class ApiError extends Error {
  constructor(params) {
    super(params)
    this.name = 'ApiError'
    this.message = params.message || 'Api error response'
    this.request = params.request
    this.response = {
      ...params.response || {},
      errorMessage:
        (params.response && params.response.errorMessage)
        || (params.response && params.response.data && params.response.data.errorMessage)
        || 'Có lỗi xảy ra trong quá trình giao tiếp với máy chủ, vui lòng thử lại!',
    }
    this.errorMessage = this.response.errorMessage
  }
}
