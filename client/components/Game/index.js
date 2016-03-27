import { Component, PropTypes } from 'react'

class Game extends Component {
  static propTypes = {
    
  };
  
  componentDidMount() {
    this.props.loadGame(this.props.routeParams.game)
  }
  
  render(){
    const {
      gameState
    } = this.props
    return <section className="section section--game">
      {gameState} game…
    </section>
  }
}

export default Game