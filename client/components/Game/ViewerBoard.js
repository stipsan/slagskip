import { Component } from 'react'

class ViewerBoard extends Component {
  render() {
    const { board, turns, versus } = this.props
    
    return <div>
      <h1>Waiting for {versus && versus.get('username')} to make a move…</h1>
    </div>
  }
}

export default ViewerBoard