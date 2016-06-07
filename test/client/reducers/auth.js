import * as types from '../../../src/client/constants/ActionTypes'

import expect from 'expect'

import { auth as reducer } from '../../../src/client/reducers/index'

describe('auth reducer', () => {

  const defaultState = {
    authState: 'unauthenticated',
    authToken: null,
    doesEmailExist: null,
    isAuthenticated: false,
  }

  it('should return the initial state', () => {
    expect(
      reducer(undefined, {}).toJS()
    ).toEqual(
      defaultState
    )
  })

  it('should detect wether a socket is already authenticated', () => {
    const initialState = reducer(undefined, {})

    expect(
      reducer(initialState, {
        type: types.SOCKET_SUCCESS,
        payload: {
          isAuthenticated: true,
        }
      }).toJS()
    ).toEqual(
      {
        ...defaultState,
        authState: 'pending',
        isAuthenticated: true,
      }
    )

    expect(
      reducer(initialState, {
        type: types.SOCKET_SUCCESS,
        payload: {
          isAuthenticated: false,
        }
      }).toJS()
    ).toEqual(
      {
        ...defaultState,
        authState: 'unauthenticated',
        isAuthenticated: false,
      }
    )
  })

  it('should return emailcheck as authState when the request starts', () => {
    expect(
      reducer(undefined, {
        type: types.CHECK_EMAIL_EXISTS_REQUESTED,
      }).toJS()
    ).toEqual(
      {
        ...defaultState,
        authState: 'emailcheck',
      }
    )
  })

  it('should set doesEmailExist on email checks', () => {
    const initialState = reducer(undefined, {})

    expect(
      reducer(initialState, {
        type: types.CHECK_EMAIL_EXISTS_SUCCESS,
        payload: {
          doesEmailExist: 1,
        }
      }).toJS()
    ).toEqual(
      {
        ...defaultState,
        doesEmailExist: true,
      }
    )

    expect(
      reducer(initialState, {
        type: types.CHECK_EMAIL_EXISTS_SUCCESS,
        payload: {
          doesEmailExist: 0,
        }
      }).toJS()
    ).toEqual(
      {
        ...defaultState,
        doesEmailExist: false,
      }
    )
  })
})
