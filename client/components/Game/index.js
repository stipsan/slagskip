import { Component, PropTypes } from 'react'

class Game extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
  };
  
  render(){
    return <section className="section section--game">
      Loading game…
    </section>
  }
}

export default Game