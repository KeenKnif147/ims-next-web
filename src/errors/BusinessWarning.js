export default class BusinessWarning extends Error {
  constructor(errorMessage) {
    super(errorMessage)
    this.errorMessage = errorMessage
    this.name = 'BusinessWarning'
  }
}
