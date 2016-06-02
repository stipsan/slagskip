import * as actions from '../../src/client/actions'
import * as types from '../../src/client/constants/ActionTypes'

import expect from 'expect'

describe('client/actions', () => {
  it('signInWithEmailAndPassword', () => {
    const credentials = {email: 'foo@bar.baz', password: 'not null'}
    expect(
      actions.signInWithEmailAndPassword(credentials)
    ).toEqual({
      type: types.AUTHENTICATE_REQUESTED,
      payload: credentials
    })
  })

  it('createUserWithEmailAndPassword', () => {
    const credentials = {email: 'foo@bar.baz', password: 'not null', username: 'Foo Bar'}
    expect(
      actions.createUserWithEmailAndPassword(credentials)
    ).toEqual({
      type: types.CREATE_USER_REQUESTED,
      payload: credentials
    })
  })
})
