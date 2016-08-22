import renderer from 'react-test-renderer'

import Field from '../Field'

jest.mock('react-collapse', () => 'Collapse')

describe('<Login.Field />', () => {
  const defaultProps = {
    input: {
      name: 'email',
      type: 'email'
    },
    meta: {
      asyncValidating: false
    }
  }
  it('should render correctly', () => {
    let component = renderer.create(
      <Field {...defaultProps} />
    )
    expect(component.toJSON()).toMatchSnapshot()

    component = renderer.create(
      <Field {...defaultProps} submitting />
    )
    expect(component.toJSON()).toMatchSnapshot()

    component = renderer.create(
      <Field {...defaultProps} input={{ name: 'password', type: 'password' }} />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
