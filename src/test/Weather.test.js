import React from 'react';
import renderer from 'react-test-renderer';
import Weather from '../Components/Weather';

describe('<Weather />', () => {
  const mockData = {
    name: 'Cape Town',
    weather: [{ description: 'Sunny' }],
    main: { temp: 20, humidity: 60 },
  };

  it('renders correctly', () => {
    const tree = renderer.create(<Weather data={mockData} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});