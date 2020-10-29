import React from 'react';
import GoogleLoginBtn from '../components/GoogleLoginBtn';
import Login from '../App';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

it('Google Login component renders correctly', async () => {

    var googleLogin = render(
        <Login url="/login" />
        );

    fireEvent.click(screen.getByTestId('loginTag'));

    //await waitFor(() => screen.getByTestId('googleBtnTag'));
        //console.log("Login: " + googleLogin);
    
    // todo Fix    expect(googleLogin.getByTestId('googleBtnTag').textContent).toBe('Login with Google');
})