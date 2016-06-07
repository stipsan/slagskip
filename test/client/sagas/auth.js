import * as types from '../../../src/client/constants/ActionTypes'
import * as sagas from '../../../src/client/sagas/auth'

import expect, { createSpy } from 'expect'
import { take, put, race } from 'redux-saga/effects'

describe('auth sagas', () => {
  it('should async email validation', () => {
    const iterator = sagas.watchValidateEmail()
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
      race({
        success: take(types.CHECK_EMAIL_EXISTS_SUCCESS),
        failure: take(types.CHECK_EMAIL_EXISTS_FAILURE),
      })
    )

    iterator.next({ success: true, failure: false })

    expect(resolve).toHaveBeenCalled()

  })
})
