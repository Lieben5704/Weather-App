import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
/*

jest-fetch-mock is a package that provides a mock for the fetch() method, allowing you to simulate responses from an API or server. 
This is useful when testing components that rely on external data, as it allows you to test the components in isolation 
without having to make actual requests to an external server.

*/
import fetchMock from 'jest-fetch-mock';
import App from '../App';

describe('<App />', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('fetches weather data correctly', async () => {
    let { getByPlaceholderText, getByText } = render(<App />);
    let areaInput = getByPlaceholderText('Please Enter Area');
    let checkButton = getByText('Check Weather');


    // Simulate user input and click event
    //fireEvent is a utility function provided by the @testing-library/react library that simulates DOM events.
    fireEvent.change(areaInput, { target: { value: 'Johannesburg' } });
    fireEvent.click(checkButton);

    // Set up mock response
    let mockData = { name: 'Johannesburg', weather: [{ description: '	broken clouds' }], main: { temp: 25.25, humidity: 52 } };
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    // Wait for component to update with new data
    await waitFor(() => expect(getByText('Johannesburg')).toBeInTheDocument());

    // Check that component state was updated correctly
    expect(getByPlaceholderText('Please Enter Area').value).toBe('Johannesburg');
    expect(getByText('broken clouds')).toBeInTheDocument();
    expect(getByText('24.46')).toBeInTheDocument();
    expect(getByText('47%')).toBeInTheDocument();
  });
});

