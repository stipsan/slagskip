import { Component } from 'react'
import { Link } from 'react-router'
import { header1 } from './style.scss'

class NotFound extends Component {
  
  render() {    
    return <section className="section section--404">
      <h1 className={header1}>Error 404!</h1>
      <Link className={header1} to="/">Home</Link>
    </section>
  }
}

export default NotFound