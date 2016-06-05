const validate = values => {
  const errors = {}
  if (!values.has('email')) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.get('email'))) {
    errors.email = 'Invalid email address'
  }
  if (!values.has('username')) {
    errors.username = 'Required'
  } else if (2 > values.get('username').trim().length) {
    errors.username = 'Username too short'
  }
  if (!values.has('password')) {
    errors.password = 'Required'
  } else if (6 > values.get('password').length) {
    errors.password = 'Password too short'
  }
  return errors
}

export default validate
