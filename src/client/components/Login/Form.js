import { Component, PropTypes } from 'react'

import CheckEmail from './steps/CheckEmail'
import Login from './steps/Login'
import Register from './steps/Register'

class Form extends Component {

  static propTypes = {
    handleCheckEmail: PropTypes.func.isRequired
  }

  state = {
    page: 1
  }

  nextPage = () => setTimeout(() => this.setState({ page: this.state.page + 1 }), 3000)

  previousPage = () => this.setState({ page: this.state.page - 1 })

  render() {
    const { handleCheckEmail, handleLogin, handleRegister, doesEmailExist } = this.props
    const { page } = this.state
    return <div>
      {null === doesEmailExist && <CheckEmail onSubmit={handleCheckEmail} />}
      {true === doesEmailExist && <Login onSubmit={handleLogin} />}
      {false === doesEmailExist && <Register onSubmit={handleRegister} />}
    </div>

  }
}

export default Form
