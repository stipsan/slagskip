import { Component, PropTypes } from 'react'
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'
import {
  section as sectionClassName,
} from './style.scss'
import Navbar from './Navbar'
import VersusGrid from './VersusGrid'
import ViewerBoard from './ViewerBoard'

class Game extends Component {
  static propTypes = {
    
  };
  
  shouldComponentUpdate = shouldComponentUpdate
  
  componentDidMount() {
    this.props.loadGame(this.props.routeParams.game)
  }
  
  render(){
    const {
      gameState,
      reasonFailed,
      versusFriend,
      viewer,
      versusGrid,
      viewerGrid,
      viewerBoard,
      selectedCell,
      turns,
      dispatch,
      isViewerTurn,
      viewerScore,
      versusScore,
    } = this.props
    
    return <section className={sectionClassName}>
      {gameState === 'loading' && <h1>Loading game…</h1>}
      {gameState === 'defeated' && <h1>You lost!</h1>}
      {gameState === 'victory' && <h1>You won!</h1>}
      {gameState === 'failed' && reasonFailed && <h2>Error: {reasonFailed}</h2>}
      {gameState === 'ready' && <div>
        <Navbar viewer={viewer} versus={versusFriend} />
        {<VersusGrid score={viewerScore} grid={versusGrid} turns={turns} selectedCell={selectedCell} dispatch={dispatch} isViewerTurn={isViewerTurn} versus={versusFriend} />}
        {<ViewerBoard score={versusScore} grid={viewerGrid} board={viewerBoard} turns={turns} versus={versusFriend} isViewerTurn={isViewerTurn} />}
        Legends:<ul style={{textAlign: 'left'}}>
        <li style={{color: '#880e4f'}}>XL : 5 points</li>
        <li style={{color: '#4527a0'}}>L  : 4  points</li>
        <li style={{color: '#0d47a1'}}>M1 : 3  points</li>
        <li style={{color: '#0d47a1'}}>M2 : 3  points</li>
        <li style={{color: '#006064'}}>S1 : 2  points</li>
        <li style={{color: '#006064'}}>S2 : 2  points</li>
        <li style={{color: '#7b0800'}}>XS1: 1  point</li>
        <li style={{color: '#7b0800'}}>XS2: 1  point</li>
      </ul>
      </div>}
      
      
    </section>
  }
}

export default Game