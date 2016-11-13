import { PropTypes } from 'react'

const Navbar = ({ left, children, right }) =>
  <nav className="uk-navbar uk-navbar-attached">
    {left}
    {right}
    <div className="uk-navbar-content uk-navbar-center">
      {children}
    </div>
  </nav>

Navbar.propTypes = {
  children: PropTypes.node.isRequired,
  left: PropTypes.node,
  right: PropTypes.node,
}

export default Navbar
