import { Component, PropTypes } from 'react'
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'

import CheckEmail from './steps/CheckEmail'
import Login from './steps/Login'
import Register from './steps/Register'

class Form extends Component {

  static propTypes = {
    doesEmailExist: PropTypes.bool,
    handleCheckEmail: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired,
    handleRegister: PropTypes.func.isRequired,
  }

  shouldComponentUpdate = shouldComponentUpdate

  render() {
    const { handleCheckEmail, handleLogin, handleRegister, doesEmailExist } = this.props
    return <div>
      {null === doesEmailExist && <CheckEmail key="step1" onSubmit={handleCheckEmail} />}
      {true === doesEmailExist && <Login key="step2" onSubmit={handleLogin} />}
      {false === doesEmailExist && <Register key="step3" onSubmit={handleRegister} />}
    </div>

  }
}

export default Form
