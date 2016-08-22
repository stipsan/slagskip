import renderer from 'react-test-renderer'

import Field from '../Field'

jest.mock('react-collapse', () => 'Collapse')

describe('<Login.Field />', () => {
  const defaultProps = {
    input: {
      name: 'email',
      onBlur: () => {},
      onChange: () => {},
      onDragStart: () => {},
      onDrop: () => {},
      onFocus: () => {},
      value: '',
    },
    meta: {
      asyncValidating: false,
      dirty: false,
      invalid: true,
      pristine: true,
      submitting: false,
      touched: false,
      valid: false,
    }
  }
  it('should render correctly', () => {
    let component = renderer.create(
      <Field {...defaultProps} />
    )
    expect(component.toJSON()).toMatchSnapshot()

    component = renderer.create(
      <Field {...defaultProps} type="email" />
    )
    expect(component.toJSON()).toMatchSnapshot()

    component = renderer.create(
      <Field
        {...defaultProps}
        meta={{
          ...defaultProps.meta,
          touched: true,
          valid: false,
          invalid: true,
          error: 'Required'
        }}
      />
    )
    expect(component.toJSON()).toMatchSnapshot()

    component = renderer.create(
      <Field
        {...defaultProps}
        input={{
          ...defaultProps.input,
          value: 'tony@stark.enterprise'
        }}
        meta={{
          ...defaultProps.meta,
          pristine: false,
          touched: true,
          valid: true,
          invalid: false,
          dirty: true,
          submitting: true
        }}
      />
    )
    expect(component.toJSON()).toMatchSnapshot()

    component = renderer.create(
      <Field
        {...defaultProps}
        input={{ ...defaultProps.input, name: 'password' }}
        type="password"
        icon="lock"
        required
      />
    )
    expect(component.toJSON()).toMatchSnapshot()

    component = renderer.create(
      <Field
        {...defaultProps}
        input={{ ...defaultProps.input, name: 'username' }}
        type="text"
        autoComplete="name"
      />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
