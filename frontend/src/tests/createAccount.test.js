import React from "react";
import CreateAccount from "../pages/CreateAccount";
import { cleanup, fireEvent, render } from "@testing-library/react";
import * as mockApi from "../Api.js"
import { BrowserRouter as Router } from "react-router-dom";


jest.mock("../Api.js");

describe("Testing frontend create account page", () => {
    let app;
    let input;
    let user = {
        firstName: "George", 
        lastName: "Smith", 
        email: "gs@gmail.com", 
        password: "12345678"
    };

    beforeEach(() => {
        app = render(
            <Router >
                <CreateAccount />
            </Router>);
    })

    afterEach(() => {
        cleanup();
    })

    it("Create account page renders", () => {
        expect(app).not.toBeNull();
    })

    describe("Tests form's text input fields", () => {
        it("Form first name input detects change", () => {
            input = app.getByPlaceholderText("First name");
            fireEvent.change(input, { target: { value: user.firstName } });

            expect(input.value).toBe(user.firstName);
        })

        it("Form last name input detects change", () => {
            input = app.getByPlaceholderText("Last name");
            fireEvent.change(input, { target: { value: user.lastName } });

            expect(input.value).toBe(user.lastName);
        })

        it("Form email input detects change", () => {
            input = app.getByPlaceholderText("Email");
            fireEvent.change(input, { target: { value: user.email } });

            expect(input.value).toBe(user.email);
        })

        it("Form password input detects change", () => {
            input = app.getByPlaceholderText("Password");
            fireEvent.change(input, { target: { value: user.password } });

            expect(input.value).toBe(user.password);
        })
    })

    describe("Testing submission", () => {
        beforeEach(() => {
            global.alert = jest.fn();
        })

        it("Submit button can be clicked", () => {
            input = app.getByDisplayValue("Create Account");
            fireEvent.click(input);

            expect(input).toBeTruthy();
        })

        it("Alert is shown after submit with null fields", () => {
            input = app.getByDisplayValue("Create Account");
            fireEvent.click(input);

            expect(global.alert).toBeCalled();
        })
        
        it("Page makes API call after submission with full form", () => {
            // Inputting form data
            fireEvent.change(app.getByPlaceholderText("First name"), { target: { value: user.firstName } });
            fireEvent.change(app.getByPlaceholderText("Last name"), { target: { value: user.lastName } });
            fireEvent.change(app.getByPlaceholderText("Email"), { target: { value: user.email } });
            fireEvent.change(app.getByPlaceholderText("Password"), { target: { value: user.password } });

            input = app.getByDisplayValue("Create Account"); 
            
            mockApi.createAccount = jest.fn().mockReturnValue({data: user});
            
            fireEvent.click(input);
            expect(mockApi.createAccount).toBeCalled();
        })
    })
})


