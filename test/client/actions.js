import * as actions from '../../src/client/actions'
import * as types from '../../src/client/constants/ActionTypes'

import expect from 'expect'
import { socketRequest } from 'redux-saga-sc'

describe('Client Action Creators', () => {
  it('can check if an email is already in use', () => {
    const email = 'foo@bar.baz'
    expect(
      actions.checkIfEmailExists(email)
    ).toEqual(socketRequest({
      type: types.CHECK_EMAIL_EXISTS_REQUESTED,
      payload: {
        successType: types.CHECK_EMAIL_EXISTS_SUCCESS,
        failureType: types.CHECK_EMAIL_EXISTS_FAILURE,
        email,
      }
    }))
  })

  it('authenticate locally with email and password', () => {
    const credentials = { email: 'foo@bar.baz', password: 'not null' }
    expect(
      actions.signInWithEmailAndPassword(credentials)
    ).toEqual(socketRequest({
      type: types.AUTHENTICATE_REQUESTED,
      payload: {
        successType: types.AUTHENTICATE_SUCCESS,
        failureType: types.AUTHENTICATE_FAILURE,
        credentials,
      }
    }))
  })

  it('can register an user with email and password', () => {
    const credentials = { email: 'foo@bar.baz', password: 'not null', username: 'Foo Bar' }
    expect(
      actions.createUserWithEmailAndPassword(credentials)
    ).toEqual(socketRequest({
      type: types.CREATE_USER_REQUESTED,
      payload: {
        successType: types.CREATE_USER_SUCCESS,
        failureType: types.CREATE_USER_FAILURE,
        credentials,
      }
    }))
  })

  it('can logout the user', () => {
    expect(
      actions.logoutUser()
    ).toEqual(socketRequest({
      type: types.DEAUTHENTICATE_REQUESTED,
      payload: {
        successType: types.DEAUTHENTICATE_SUCCESS,
        failureType: types.DEAUTHENTICATE_FAILURE,
      }
    }))
  })

  it('can lazy load friends', () => {
    const friendIds = [1, 2, 3]
    expect(
      actions.fetchFriends(friendIds)
    ).toEqual(socketRequest({
      type: types.FRIENDS_REQUESTED,
      payload: {
        successType: types.FRIENDS_SUCCESS,
        failureType: types.FRIENDS_FAILURE,
        friendIds,
      }
    }))
  })

  it('can lazy load games', () => {
    const gameIds = [1, 2, 3]
    expect(
      actions.fetchGames(gameIds)
    ).toEqual(socketRequest({
      type: types.GAMES_REQUESTED,
      payload: {
        successType: types.GAMES_SUCCESS,
        failureType: types.GAMES_FAILURE,
        gameIds,
      }
    }))
  })

  it('should request a new game', () => {
    const data = { versus: 1 }
    expect(
      actions.newGame(data)
    ).toEqual(socketRequest({
      type: types.NEW_GAME_REQUESTED,
      payload: {
        successType: types.NEW_GAME_SUCCESS,
        failureType: types.NEW_GAME_FAILURE,
        versus: 1,
      }
    }))
  })

  it('should join a new game', () => {
    const data = { id: 1 }
    expect(
      actions.joinGame(data)
    ).toEqual(socketRequest({
      type: types.JOIN_GAME_REQUESTED,
      payload: {
        successType: types.JOIN_GAME_SUCCESS,
        failureType: types.JOIN_GAME_FAILURE,
        id: 1,
      }
    }))
  })

  it('can rotate pieces on the setup board', () => {
    const item = 'xl'
    expect(
      actions.rotateItem(item)
    ).toEqual({
      type: types.ROTATE_ITEM,
      item,
    })
  })
  it('should let you organize items on a game board by both startIndex and x/y coordinates', () => {
    const item = 'xl'
    const startIndex = 10
    const x = 5
    const y = 1

    expect(
      actions.addItem(item, startIndex)
    ).toEqual({
      type: types.ADD_ITEM,
      position: [0, 1],
      item,
    })
    expect(
      actions.moveItem(item, startIndex)
    ).toEqual({
      type: types.MOVE_ITEM,
      position: [0, 1],
      item,
    })

    expect(
      actions.addItem(item, x, y)
    ).toEqual({
      type: types.ADD_ITEM,
      position: [x, y],
      item,
    })
    expect(
      actions.moveItem(item, x, y)
    ).toEqual({
      type: types.MOVE_ITEM,
      position: [x, y],
      item,
    })
  })
})
