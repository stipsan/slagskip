import * as actions from '../../src/client/actions'
import * as types from '../../src/client/constants/ActionTypes'

import expect from 'expect'

describe('client/actions', () => {
  it('signInWithEmailAndPassword', () => {
    const credentials = {email: 'foo@bar.baz', password: 'not null'}
    expect(
      actions.signInWithEmailAndPassword(credentials)
    ).toEqual({
      type: types.AUTHENTICATE_REQUEST,
      payload: credentials
    })
  })
})
