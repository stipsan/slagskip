import * as actions from '../../../src/client/actions'
import * as types from '../../../src/client/constants/ActionTypes'
import * as sagas from '../../../src/client/sagas/auth'

import expect, { createSpy } from 'expect'
import { take, put, race } from 'redux-saga/effects'

describe('auth sagas', () => {
  it('should async email validation', () => {
    const iterator = sagas.validateEmail()
    const resolve = createSpy()
    const email = 'test@example.com'

    expect(
      iterator.next().value
    ).toEqual(
      take(types.CHECK_EMAIL_EXISTS_ASYNC)
    )

    expect(
      iterator.next({
        payload: {
          email,
          resolve,
        }
      }).value
    ).toEqual(
      put({
        type: types.SOCKET_EMIT,
        payload: {
          type: types.CHECK_EMAIL_EXISTS_REQUESTED,
          payload: {
            successType: types.CHECK_EMAIL_EXISTS_SUCCESS,
            failureType: types.CHECK_EMAIL_EXISTS_FAILURE,
            email,
          }
        }
      })
    )

    expect(
      iterator.next().value
    ).toEqual(
      take([types.CHECK_EMAIL_EXISTS_SUCCESS, types.CHECK_EMAIL_EXISTS_FAILURE])
    )

    iterator.next()

    expect(resolve).toHaveBeenCalled()

  })

  it('will handle login flow', () => {
    const iterator = sagas.loginFlow()
    const credentials = {
      email: 'test@example.com',
      password: '123',
    }
    const authAction = actions.signInWithEmailAndPassword(credentials)
    const emitAuthAction = { type: types.SOCKET_EMIT, payload: authAction }

    expect(
      iterator.next().value
    ).toEqual(
      take(types.AUTHENTICATE_REQUESTED)
    )

    expect(
      iterator.next(authAction).value
    ).toEqual(
      put(emitAuthAction)
    )

    expect(
      iterator.next().value
    ).toEqual(
      take([types.RECEIVE_DEAUTHENTICATE, types.DEAUTHENTICATE_SUCCESS, types.AUTHENTICATE_FAILURE])
    )

  })

})
