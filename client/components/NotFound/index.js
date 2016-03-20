import { Component } from 'react'
import { Link } from 'react-router'
import {
  section as sectionClassName,
} from './style.scss'

class NotFound extends Component {
  
  render() {    
    return <section className={sectionClassName}>
      <h1>Error 404!</h1>
      <Link to="/">Home</Link>
    </section>
  }
}

export default NotFound