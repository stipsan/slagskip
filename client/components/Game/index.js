import { Component, PropTypes } from 'react'
import {
  section as sectionClassName,
} from './style.scss'
import Navbar from './Navbar'
import VersusGrid from './VersusGrid'
import ViewerBoard from './ViewerBoard'

class Game extends Component {
  static propTypes = {
    
  };
  
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
      viewerBoard,
      selectedCell,
      turns,
      dispatch,
      isViewerTurn,
    } = this.props
    
    return <section className={sectionClassName}>
      {gameState === 'loading' && <h1>Loading game…</h1>}
      {gameState === 'failed' && reasonFailed && <h2>Error: {reasonFailed}</h2>}
      {gameState !== 'failed' && gameState !== 'loading' && <div>
        <Navbar viewer={viewer} versus={versusFriend} />
        {<VersusGrid grid={versusGrid} turns={turns} selectedCell={selectedCell} dispatch={dispatch} isViewerTurn={isViewerTurn} versus={versusFriend} />}
        {false && <ViewerBoard board={viewerBoard} turns={turns} versus={versusFriend} isViewerTurn={isViewerTurn} />}
      </div>}
    </section>
  }
}

export default Game