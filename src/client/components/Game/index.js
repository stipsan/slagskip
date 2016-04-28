import DocumentTitle from 'react-document-title'
import { Component, PropTypes } from 'react'
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'
import { Link } from 'react-router'

import cx from './style.scss'
import Navbar from '../Navbar'
import VersusGrid from './VersusGrid'
import ViewerBoard from './ViewerBoard'
import { fireCannon } from '../../actions'

class Game extends Component {
  static propTypes = {
    gameState: PropTypes.string.isRequired,
    isViewerTurn: PropTypes.bool.isRequired,
    loadGame: PropTypes.func.isRequired,
    reasonFailed: PropTypes.string,
    routeParams: PropTypes.shapeOf({
      game: PropTypes.number.isRequired
    }).isRequired,
    selectedCell: PropTypes.number,
    versusScore: PropTypes.number.isRequired,
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

    const navbarLeft = <Link to="/" className={cx('backLink')}>{'❮ Games'}</Link>
    const opponentLabel = versusFriend && versusFriend.get('username') || 'opponent'
    const title = viewer ? `Epic | ${viewer.get('username')} vs. ${opponentLabel}` : null

    return (
      <DocumentTitle title={title}>
        <section className={cx('section')}>
          <Navbar left={navbarLeft} />
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
