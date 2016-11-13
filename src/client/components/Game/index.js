import './index.less'

import cx from 'classnames'
import DocumentTitle from 'react-document-title'
import { Component, PropTypes } from 'react'
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'
import { Link } from 'react-router'
import Gameboard from 'epic-client/components/Gameboard'
import { selectCell, fireCannon } from 'epic-client/actions'

import Navbar from '../Navbar'
import Scoreboard from './Scoreboard'

class Game extends Component {
  static propTypes = {
    gameState: PropTypes.string.isRequired,
    isViewerTurn: PropTypes.bool.isRequired,
    loadGame: PropTypes.func.isRequired,
    reasonFailed: PropTypes.string,
    routeParams: PropTypes.shape({
      game: PropTypes.number.isRequired
    }).isRequired,
    selectedCell: PropTypes.number,
    turns: PropTypes.array, // @TODO custom validator
    versusFriend: PropTypes.shape({
      username: PropTypes.string
    }),
    versusGrid: PropTypes.arrayOf(PropTypes.number),
    versusScore: PropTypes.number.isRequired,
    viewer: PropTypes.shape({
      username: PropTypes.string
    }),
    viewerBoard: PropTypes.shape({
      grid: PropTypes.arrayOf(PropTypes.number),
    }),
    viewerGrid: PropTypes.arrayOf(PropTypes.number),
    viewerScore: PropTypes.number.isRequired,
  }

  componentDidMount() {
    this.props.loadGame(this.props.routeParams.game)
  }

  shouldComponentUpdate = shouldComponentUpdate

  handleFireCannon = () => {
    this.props.dispatch(fireCannon({
      id: this.props.routeParams.game,
      selectedCell: this.props.selectedCell
    }))
  }

  handleSelectCell = (id) => {
    this.props.dispatch(selectCell(id))
  }

  render() {
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

    const navbarLeft = (
      <div className="uk-navbar-content">
        <Link to="/" className="uk-button uk-button-link">
          {'❮'} <span>{'Games'}</span>
        </Link>
      </div>
    )
    const opponentLabel = versusFriend && versusFriend.get('username') || 'opponent'
    const title = viewer ? `Epic | ${viewer.get('username')} vs. ${opponentLabel}` : null

    return (
      <DocumentTitle title={title}>
        <section className="tm-game-background">
          <Navbar left={navbarLeft} />
          <div className="uk-margin-top">
            <Gameboard grid={versusGrid} onSelectCell={this.handleSelectCell} selectedCell={'victory' !== gameState && 'defeat' !== gameState && selectedCell} />
          </div>
          <div className="gamecontrols">
            <button
              className="uk-button uk-button-large uk-button-primary uk-width-1-1 uk-margin-top"
              disabled={gameState !== 'ready' || -1 === selectedCell}
              onClick={this.handleFireCannon}
            >
              {'failed' === gameState && reasonFailed && <div>{`Error: ${reasonFailed}`}</div>}
              {'victory' === gameState && <div>{'You won!'}</div>}
              {'defeat' === gameState && <div>{'You lost!'}</div>}
              {'loading' === gameState && <div>{'Loading game…'}</div>}
              {
                'waiting' !== gameState &&
                'victory' !== gameState &&
                'defeat' !== gameState &&
                (-1 === selectedCell ?
                  'Select a spot' :
                  ('victory' !== gameState && 'defeat' !== gameState && (
                    'Send'
                  )))
              }
              {'waiting' === gameState && 'victory' !== gameState && 'defeat' !== gameState && (
                <span>{`Waiting for ${opponentLabel}`}</span>
              )}
            </button>
          </div>
          <div className="uk-flex uk-flex-top uk-flex-space-between gamestatus">
            {viewer && versusFriend && <Scoreboard players={[
              { ...viewer.toJS(), score: viewerScore },
              { ...versusFriend.toJS(), score: versusScore }
            ]} turns={turns} />}
            <Gameboard grid={viewerGrid} mine={viewerBoard} size={150} />
          </div>
        </section>
      </DocumentTitle>
    )
  }
}

export default Game
