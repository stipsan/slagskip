import { Component } from 'react'

class Navbar extends Component {
  render() {
    const { viewer, versus } = this.props
    
    return <div>
      {viewer && viewer.get('username')} vs. {versus && versus.get('username')}
    </div>
  }
}

export default Navbar