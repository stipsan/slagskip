import { Map } from 'immutable'

import asyncValidate from '../asyncValidate'

describe('Login/asyncValidate', () => {
  it('should dispatch CHECK_EMAIL_EXISTS_ASYNC', () => {
    const dispatch = jest.fn()
    Promise.resolve(asyncValidate(
      Map({ email: 'tony@stark.enterprise' }),
      dispatch
    ))
    expect(dispatch).toBeCalled()
    const arg = dispatch.mock.calls[0][0]
    expect(arg.type).toEqual('CHECK_EMAIL_EXISTS_ASYNC')
    expect(arg.payload.email).toEqual('tony@stark.enterprise')
    expect(typeof arg.payload.resolve).toEqual('function')
    expect(typeof arg.payload.reject).toEqual('function')
  })
})
