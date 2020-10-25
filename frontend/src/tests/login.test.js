
import React from 'react';
import Login from '../pages/Login';
import App from '../App';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

afterEach(cleanup);

it('Page title renders', () => {

    var app = render(<App />);

    console.log('App ' + app);

    expect(app.findAllByText("Eagle ePortfolio"));
})

it('Home button renders', () => {

    var app = render(<App />);

    console.log('App ' + app);

    expect(app.getAllByRole('button')).
})
