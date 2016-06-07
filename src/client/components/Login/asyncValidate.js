import {
  CHECK_EMAIL_EXISTS_ASYNC,
} from '../../constants/ActionTypes'

const asyncValidate = (values, dispatch) => new Promise((resolve, reject) =>
  dispatch({ type: CHECK_EMAIL_EXISTS_ASYNC, payload: {
    email: values.get('email'), resolve, reject
  } })
)

export default asyncValidate
