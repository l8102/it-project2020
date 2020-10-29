import React from 'react';
import NavBar from '../components/NavBar';
import App from '../App';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

afterEach(cleanup);

it('Navbar title renders correctly', () => {

    var app = render(<NavBar />);

    expect(app.getByTestId('titleTag').textContent).toBe(' Eagle ePortfolio ');
})

it('Buttons render', () => {

    var app = render(<App />);

    console.log('App ' + app);

    expect(app.getAllByRole('button'));
})

it('Login button renders and redirects', () => {

    var app = render(<NavBar />);


    expect(app.getByTestId('loginTag').textContent).toBe('Login');

    expect(fireEvent.click(app.getByTestId('loginTag'))).toBe(true);
  
    
})

it('Footer renders', () => {

    var app = render(<App />);

    console.log('App ' + app);

    expect(app.findByRole('footer'));
})
