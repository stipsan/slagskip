import * as sagas from '../../../src/server/sagas/auth'
import * as types from '../../../src/shared/constants/ActionTypes'

import expect from 'expect'

import { authenticate as iterator } from '../../../src/server/sagas/auth'

describe('server auth sagas', () => {
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
