import { Component, PropTypes } from 'react'

export default class Logoutbar extends Component {
  static propTypes = {
    handleLogout: PropTypes.func.isRequired,
    username: PropTypes.string,
  }

  shouldComponentUpdate(nextProps) {
    if (!nextProps.username) return false

    return true
  }
  render() {
    const { username, handleLogout } = this.props
    return (<header>
      <h2>{`Welcome, ${username}!`} <button onClick={handleLogout}>{'Logout'}</button></h2>
    </header>)
  }
}
