import { Component, PropTypes } from 'react'
import DocumentTitle from 'react-document-title'
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
    
    return <DocumentTitle title={viewer ? `Epic | ${viewer.get('username')} vs. ${versusFriend && versusFriend.get('username')}` : null}>
      <section className={sectionClassName}>
        <Navbar viewer={viewer} versus={versusFriend} />
        {gameState === 'loading' && <h1>Loading game…</h1>}
        {gameState === 'defeated' && <h1>You lost!</h1>}
        {gameState === 'victory' && <h1>You won!</h1>}
        {gameState === 'failed' && reasonFailed && <h2>Error: {reasonFailed}</h2>}
        {gameState === 'ready' && !isViewerTurn && <div>
          <h5>Waiting for {versusFriend && versusFriend.get('username') || 'opponent'} to make a move…</h5>
        </div>}
        {gameState === 'waiting' && <h5>Waiting for {versusFriend && versusFriend.get('username') || 'opponent'} to setup their board</h5>}
        {<VersusGrid gameState={gameState} gameId={this.props.routeParams.game} score={viewerScore} grid={versusGrid} turns={turns} selectedCell={selectedCell} dispatch={dispatch} isViewerTurn={isViewerTurn} versus={versusFriend} />}
        {<ViewerBoard score={versusScore} grid={viewerGrid} board={viewerBoard} turns={turns} versus={versusFriend} isViewerTurn={isViewerTurn} />}
      </section>
    </DocumentTitle>
  }
}

export default Game