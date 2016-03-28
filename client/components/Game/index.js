import { Component, PropTypes } from 'react'
import {
  section as sectionClassName,
} from './style.scss'

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
    return <section className={sectionClassName}>
      <h1>{gameState === 'failed' ? 'Failed loading game!' : `${gameState} game…`}</h1>
    </section>
  }
}

export default Game