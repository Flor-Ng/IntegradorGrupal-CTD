import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, cleanup } from '@testing-library/react';
import SignUp from '../components/Signup';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

let component;

describe("<Singup />", () => {
    beforeEach(() => {
        component = render(<Router><SignUp /></Router>)
    })

    it('Renders OK', () => {
        expect(component).toBeDefined();
    })
})