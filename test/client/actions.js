import * as actions from '../../src/client/actions'
import * as types from '../../src/client/constants/ActionTypes'

import expect from 'expect'

describe('Client Action Creators', () => {
  it('can check if an email is already in use', () => {
    const email = 'foo@bar.baz'
    expect(
      actions.checkIfEmailExists(email)
    ).toEqual({
      type: types.CHECK_EMAIL_EXISTS_REQUESTED,
      payload: {
        successType: types.CHECK_EMAIL_EXISTS_SUCCESS,
        failureType: types.CHECK_EMAIL_EXISTS_FAILURE,
        email,
      }
    })
  })

  it('authenticate locally with email and password', () => {
    const credentials = {email: 'foo@bar.baz', password: 'not null'}
    expect(
      actions.signInWithEmailAndPassword(credentials)
    ).toEqual({
      type: types.AUTHENTICATE_REQUESTED,
      payload: {
        successType: types.AUTHENTICATE_SUCCESS,
        failureType: types.AUTHENTICATE_FAILURE,
        credentials,
      }
    })
  })

  it('can register an user with email and password', () => {
    const credentials = {email: 'foo@bar.baz', password: 'not null', username: 'Foo Bar'}
    expect(
      actions.createUserWithEmailAndPassword(credentials)
    ).toEqual({
      type: types.CREATE_USER_REQUESTED,
      payload: {
        successType: types.CREATE_USER_SUCCESS,
        failureType: types.CREATE_USER_FAILURE,
        credentials,
      }
    })
  })
})
