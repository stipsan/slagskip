import fx from 'animate.css'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Component, PropTypes } from 'react'
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'

import cx from './style.scss'
import CheckEmail from './steps/CheckEmail'
import Login from './steps/Login'
import Register from './steps/Register'

const transitionName = {
  enter: cx('enter'),
  enterActive: fx('fadeInRight'),
  leave: cx('leave'),
  leaveActive: cx('fadeOutLeft'),
}
const transitionDuration = 600

class Form extends Component {

  static propTypes = {
    handleCheckEmail: PropTypes.func.isRequired
  }

  render() {
    const { handleCheckEmail, handleLogin, handleRegister, doesEmailExist } = this.props
    return <ReactCSSTransitionGroup
      component="div"
      style={{ position: 'relative' }}
      transitionName={transitionName}
      transitionEnterTimeout={transitionDuration}
      transitionLeaveTimeout={transitionDuration}
           >
      {null === doesEmailExist && <CheckEmail key="step1" onSubmit={handleCheckEmail} />}
      {true === doesEmailExist && <Login key="step2" onSubmit={handleLogin} />}
      {false === doesEmailExist && <Register key="step3" onSubmit={handleRegister} />}
    </ReactCSSTransitionGroup>

  }
}

export default Form
