import { Component } from 'react'
import { Link } from 'react-router'

class NotFound extends Component {
  
  render() {    
    return <section className="section section--404">
      <h1>Error 404!</h1>
      <Link to="/">Home</Link>
    </section>
  }
}

export default NotFound