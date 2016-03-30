import { Component, PropTypes } from 'react'
import { Link } from 'react-router'

class Games extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  }
  
  render() {
    const { children } = this.props
    
    return <ul>
      <li><Link to="new">New Game</Link></li>
      <li>No games yet…</li>
    </ul>
  }
}

export default Games