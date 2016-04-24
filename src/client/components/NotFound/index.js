import { Component } from 'react'
import { Link } from 'react-router'
import cx from './style.scss'

class NotFound extends Component {

  render() {
    return (<section className={cx('section')}>
      <h1>Error 404!</h1>
      <Link to="/">Home</Link>
    </section>)
  }
}

export default NotFound
