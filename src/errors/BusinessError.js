export default class BusinessError extends Error {
  constructor(errorMessage) {
    super(errorMessage)
    this.errorMessage = errorMessage
    this.name = 'BusinessError'
  }
}
