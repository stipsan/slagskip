import './index.less'

import cx from 'classnames'
import DocumentTitle from 'react-document-title'
import { Component, PropTypes } from 'react'
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'
import { Link } from 'react-router'
import Gameboard from 'epic-client/components/Gameboard'
import { selectCell } from 'epic-client/actions'

import Navbar from '../Navbar'
import Scoreboard from './Scoreboard'
import VersusGrid from './VersusGrid'
import ViewerBoard from './ViewerBoard'
import { fireCannon } from '../../actions'

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
          {viewer && versusFriend && <Scoreboard players={[
            { ...viewer.toJS(), score: viewerScore },
            { ...versusFriend.toJS(), score: versusScore }
          ]} />}
          <div className="tm-match uk-grid uk-flex-middle">
            <div className="uk-width-medium-1-2" />
            <div className="uk-width-medium-1-2" />
          </div>
          <div className={cx('scores')}>
            <div className={cx('score')}>
              <h6 className={cx('header')}>{viewer && viewer.get('username') || 'You'}</h6>
              <strong className={cx('viewerScore')}>{viewerScore}</strong>
            </div>
            <div className={cx('score')}>
              <h6 className={cx('header')}>
                {versusFriend && versusFriend.get('username') || 'Versus'}
              </h6>
              <strong className={cx('versusScore')}>{versusScore}</strong>
            </div>
          </div>
          <div className={cx('state')}>
            {'failed' === gameState && reasonFailed && <div>{`Error: ${reasonFailed}`}</div>}
            {'victory' === gameState && <div>{'You won!'}</div>}
            {'defeated' === gameState && <div>{'You lost!'}</div>}
            {'loading' === gameState && <div>{'Loading game…'}</div>}
            {
              isViewerTurn &&
              'waiting' !== gameState &&
              'victory' !== gameState &&
              'defeat' !== gameState &&
              (-1 === selectedCell ?
                'Select a spot' :
                ('victory' !== gameState && 'defeated' !== gameState && (
                  <div className={cx('readyToFire')}>
                    {'Ready?'}
                    <button
                      className={cx('sendButton')}
                      onClick={this.handleFireCannon}
                    >
                      {'Send'}
                    </button>
                  </div>
                )))
            }
            {'waiting' === gameState && 'victory' !== gameState && 'defeat' !== gameState && (
              <div className={cx('waitingForOpponent')}>
                {`Waiting for ${opponentLabel} to setup their board`}
              </div>
            )}
            {'ready' === gameState && !isViewerTurn && <div className={cx('waitingForTurn')}>
              {`${opponentLabel}'s turn`}
            </div>}
          </div>
          <Gameboard grid={versusGrid} onSelectCell={this.handleSelectCell} selectedCell={selectedCell} />
          <div className="uk-grid uk-grid-collapse gamestatus">
            <div className="uk-width-1-2">
              Scores and stuffs
            </div>
            <div className="uk-width-1-2">
              <Gameboard grid={viewerGrid} mine={viewerBoard} size={160} />
            </div>
          </div>

          {'loading' !== gameState && (
            <VersusGrid
              gameState={gameState}
              gameId={this.props.routeParams.game}
              score={viewerScore}
              grid={versusGrid}
              turns={turns}
              selectedCell={selectedCell}
              dispatch={dispatch}
              isViewerTurn={isViewerTurn}
              versus={versusFriend}
            />
          )}
          <br />
          {'loading' !== gameState && (
            <ViewerBoard
              score={versusScore}
              grid={viewerGrid}
              board={viewerBoard}
              turns={turns}
              versus={versusFriend}
              isViewerTurn={isViewerTurn}
            />
          )}
        </section>
      </DocumentTitle>
    )
  }
}

export default Game
