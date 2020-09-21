
import React from 'react';
import Login from '../pages/Login';
import { cleanup, fireEvent, render } from '@testing-library/react';

afterEach(cleanup);

it('Google Login renders', () => {

    const login = render(<Login />);

    console.log('LOGIN' + login);

    expect(app.getByTestId('google-button')).not.toBeNull();
})
