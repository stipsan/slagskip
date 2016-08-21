import renderer from 'react-test-renderer'

import Login from '../index'

describe('<Login />', () => {
  it('should render correctly', () => {
    const component = renderer.create(
      <Login />
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
