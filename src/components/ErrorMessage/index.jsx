import React from 'react'
import tikiFailed from '../../../public/images/mascot-fail.png'
import './styles.less'

const ErrorMessage = ({ message }) => (
  <div className="error-message">
    <img src={tikiFailed} alt={message} />
    <div>{message}</div>
  </div>
)

export default ErrorMessage
