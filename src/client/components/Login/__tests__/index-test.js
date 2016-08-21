import renderer from 'react-test-renderer'

import Login from '../index'

describe('<Login />', () => {
  const defaultProps = {
    createUserWithEmailAndPassword: () => {},
    signInWithEmailAndPassword: () => {},
    isRequestPending: false,
    handleCheckEmail: () => {},
    store: () => {}
  }
  it('should render correctly', () => {
    const component = renderer.create(
      <Login {...defaultProps} />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
