import renderer from 'react-test-renderer'

jest.mock('react-height')
jest.mock('react-collapse', () => 'Collapse')
jest.mock('epic-client/components/Form/Field', () => 'Field')
const Login = require('../index').default

describe('<Login />', () => {
  const defaultProps = {
    createUserWithEmailAndPassword: () => {},
    signInWithEmailAndPassword: () => {},
    isRequestPending: false,
    handleSubmit: () => () => {}
  }
  it('should render correctly', () => {
    let component = renderer.create(
      <Login {...defaultProps} />
    )
    expect(component.toJSON()).toMatchSnapshot()

    component = renderer.create(
      <Login {...defaultProps} doesEmailExist />
    )
    expect(component.toJSON()).toMatchSnapshot()

    component = renderer.create(
      <Login {...defaultProps} doesEmailExist={false} />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
