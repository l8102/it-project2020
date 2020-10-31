import React from 'react';
import CreateAccount from '../pages/CreateAccount';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

describe("Testing create account page", () => {
    let createAccount;
    let input;
    let user = {
        firstName: "George", 
        lastName: "Smith", 
        email: "gs@gmail.com", 
        password: "12345678"
    };

    beforeEach(() => {
        createAccount = render(
            <Router>
                <CreateAccount />
            </Router>);
    })

    afterAll(() => {
        cleanup();
    })

    it('Create account page renders', () => {
        expect(createAccount).not.toBeNull();
    })

    describe("Tests form's text input fields", () => {
        it('Form first name input detects change', () => {
            input = createAccount.getByPlaceholderText("First name");
            fireEvent.change(input, { target: { value: user.firstName } });

            expect(input.value).toBe(user.firstName);
        })

        it('Form last name input detects change', () => {
            input = createAccount.getByPlaceholderText("Last name");
            fireEvent.change(input, { target: { value: user.lastName } });

            expect(input.value).toBe(user.lastName);
        })

        it('Form email input detects change', () => {
            input = createAccount.getByPlaceholderText("Email");
            fireEvent.change(input, { target: { value: user.email } });

            expect(input.value).toBe(user.email);
        })

        it('Form password input detects change', () => {
            input = createAccount.getByPlaceholderText("Password");
            fireEvent.change(input, { target: { value: user.password } });

            expect(input.value).toBe(user.password);
        })
    })

    //TODO: Add tests for clicking on the submit button
})

