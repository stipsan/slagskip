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

  nextPage = () => this.setState({ page: this.state.page + 1 })

  previousPage = () => this.setState({ page: this.state.page - 1 })

  render() {
    const { onSubmit } = this.props
    const { page } = this.state
    return <div>
      {1 === page && <CheckEmail onSubmit={this.nextPage} />}
      {2 === page && <Login previousPage={this.previousPage} onSubmit={this.nextPage} />}
      {3 === page && <Register previousPage={this.previousPage} onSubmit={onSubmit} />}
    </div>

  }
}

export default Form
