import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, cleanup } from '@testing-library/react';
import Login from '../components/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { fireEvent, prettyDOM } from '@testing-library/dom';

describe("<Login />", () => {
    beforeEach(() => {
        render(<Router><Login /></Router>);
    })

    it('Renders OK', () => {
        const component = screen.getByTestId('test-login');
        expect(component).toBeInTheDocument();
        expect(component).toHaveTextContent("Iniciar sesión");
    })
})