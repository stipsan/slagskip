import { Component, PropTypes } from 'react'

export default class Logoutbar extends Component {
  static propTypes = {
    username: PropTypes.string,
    handleLogout: PropTypes.func.isRequired,
  }
  
  shouldComponentUpdate(nextProps) {
    if(!nextProps.username) return false
    
    return true
  }
  render() {
    const { username, handleLogout } = this.props
    return <header>
      <h2>Welcome, {username}! <button onClick={handleLogout}>Logout</button></h2>
    </header>
  }
}