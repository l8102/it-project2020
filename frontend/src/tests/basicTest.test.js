import React from 'react';
import App from '../App';
import { cleanup, fireEvent, render } from '@testing-library/react';

afterEach(cleanup);

it('Check test file runs', () => {

    const app = render(<App />);

    console.log('APP' + app);

    expect(app).not.toBeNull();
})