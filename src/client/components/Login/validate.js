const validate = values => {
  const errors = {}
  console.log('validator', values)
  if (!values.has('email')) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.get('email'))) {
    errors.email = 'Invalid email address'
  }
  if (!values.has('username')) {
    errors.username = 'Required'
  }
  return errors
}

export default validate
