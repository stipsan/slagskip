import { Component, PropTypes } from 'react'

import CheckEmail from './stepsCheckEmail'
import Login from './stepsLogin'
import Register from './stepsRegister'

class Form extends Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired
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
