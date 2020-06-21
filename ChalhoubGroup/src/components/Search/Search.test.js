import React from 'react';
import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Search from './Search';

describe('<Search />', () => {
  afterEach(cleanup);

  test('it should mount', () => {
    const { getByTestId } = render(<Search />);
    const search = getByTestId('Search');

    expect(search).toBeInTheDocument();
  });
});