import shallowCompare from 'react-addons-shallow-compare'
import DocumentTitle from 'react-document-title'
import { shuffle } from 'lodash'
import { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import cx from 'classnames'
import Loading from '../Loading'
import Navbar from '../Navbar'
import { Grid, SetupCanvas, Item } from '../Board'

const {
  Drag,
  XL,
  L,
  M,
  S,
  XS,
  DragPreview
} = Item

const types = [
  ['xl', 5, <XL />],
  ['l', 4, <L />],
  ['m1', 3, <M />],
  ['m2', 3, <M />],
  ['s1', 2, <S />],
  ['s2', 2, <S />],
  ['xs1', 1, <XS />],
  ['xs2', 1, <XS />],
]

const incDefaultIndex = (previousIndex, type, items, size) => {

  if (-1 !== items.getIn([type, 1])) {
    return [previousIndex, 0]
  }

  const previousRemainder = previousIndex % 10
  const nextRemainder = previousRemainder + size

  const nextRow = (Math.floor(previousIndex / 10) * 10) + 11
  const incrementedIndex = 9 < nextRemainder ?
    nextRow :
    previousIndex
  return [incrementedIndex, size]
}

class Setup extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    addItem: PropTypes.func.isRequired,
    board: PropTypes.shape({
      grid: PropTypes.arrayOf(PropTypes.number),
    }),
    bots: PropTypes.array.isRequired,
    fetchFriends: PropTypes.func.isRequired,
    friends: PropTypes.array,
    friendsTotal: PropTypes.number.isRequired,
    gameId: PropTypes.number,
    isValid: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired,
    joinGame: PropTypes.func.isRequired,
    loadGame: PropTypes.func.isRequired,
    moveItem: PropTypes.func.isRequired,
    newGame: PropTypes.func.isRequired,
    rotateItem: PropTypes.func.isRequired,
    routeParams: PropTypes.shape({
      game: PropTypes.number,
      versus: PropTypes.number
    }).isRequired,
    versus: PropTypes.shape({
      username: PropTypes.string
    }),
  }

  componentWillMount() {
    this.types = shuffle(types)
  }

  componentDidMount() {
    const { friends, friendsTotal, fetchFriends } = this.props

    if (friends.size !== friendsTotal) {
      fetchFriends()
    }

    if (this.props.routeParams.game) {
      this.props.loadGame(this.props.routeParams.game)
    }

    if ('production' !== process.env.NODE_ENV) {
      require('konami-komando')({
        useCapture: true,
        callback: () => {
          this.props.dispatch({ type: 'RANDOM_ITEMS' })
        }
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.friendsTotal !== this.props.friendsTotal) {
      nextProps.fetchFriends()
    }

    if (nextProps.gameId !== this.props.gameId &&
        0 < nextProps.gameId && 'waiting' === nextProps.gameState) {
      this.context.router.push({ pathname: `/game/${nextProps.gameId}` })
    }
    if ('ready' === nextProps.gameState && !this.props.routeParams.versus && 0 < nextProps.gameId) {
      this.context.router.push({ pathname: `/game/${nextProps.gameId}` })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  handleNewGame = event => {
    event.preventDefault()

    this.props.newGame(this.props.routeParams.versus, this.props.board)
  }

  handleJoinGame = event => {
    event.preventDefault()

    this.props.joinGame(this.props.routeParams.game, this.props.board)
  }

  render() {
    const {
      items,
      addItem,
      moveItem,
      rotateItem,
      friends,
      routeParams,
      isValid,
      bots,
    } = this.props

    if (!friends) return <Loading />

    const versusId = routeParams.game ? this.props.versus : routeParams.versus
    const versus = friends.get(versusId) || bots.find(bot => bot.get('id') === versusId)

    if (!versus) return <Loading />

    const versusUsername = versus.get('username')
    const startGameButtonClassName = cx('startGame', {
      startGameDisabled: !isValid
    })

    let defaultIndex = 111

    const navbarLeft = (<Link to="/new" className={cx('linkToPrevous')}>
      {'❮'} <span className={cx('buttonLabel')}>{'Back'}</span>
    </Link>)
    const navbarRight = routeParams.game ?
      <button
        disabled={!isValid}
        onClick={this.handleJoinGame}
        className={startGameButtonClassName}
      >
        {'Join'}
      </button> :
      routeParams.versus && (
        <button
          disabled={!isValid}
          onClick={this.handleNewGame}
          className={startGameButtonClassName}
        >
          {'Start'}
        </button>
      )

    return (<DocumentTitle title={`Epic | New Game vs ${versusUsername}`}>
      <section className={cx('section')}>
        <Navbar left={navbarLeft} right={navbarRight}>
          <h1 className={cx('headerTitle')}>
            {`You vs ${versusUsername}`}
          </h1>
        </Navbar>
        <div className={cx('wrapper')}>
          <SetupCanvas addItem={addItem} moveItem={moveItem}>
            <Grid>
              {this.types.map(([type, size, component]) => {
                const [previousIndex, nextSize] = incDefaultIndex(defaultIndex, type, items, size)
                defaultIndex = previousIndex + nextSize

                return (
                  <Drag
                    key={type}
                    type={type}
                    index={items.getIn([type, 1])}
                    defaultIndex={previousIndex}
                    size={size}
                    rotateItem={rotateItem}
                    rotated={items.getIn([type, 0])}
                  >
                    {component}
                  </Drag>
                )
              })}
              <DragPreview name="item" />
            </Grid>
          </SetupCanvas>
        </div>
        <div></div>
      </section>
    </DocumentTitle>)
  }
}

export default Setup
