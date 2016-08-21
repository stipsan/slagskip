import renderer from 'react-test-renderer'

jest.mock('epic-client/components/Form/Field', () => 'Field')
const Login = require('../index').default

describe('<Login />', () => {
  const defaultProps = {
    createUserWithEmailAndPassword: () => {},
    signInWithEmailAndPassword: () => {},
    isRequestPending: false,
    handleCheckEmail: () => {}
  }
  it('should render correctly', () => {
    const component = renderer.create(
      <Login {...defaultProps} />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
