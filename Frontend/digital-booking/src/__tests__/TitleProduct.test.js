import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TitleProduct from '../components/TitleProduct';

let component;

const props = {
    "category": "Hotel",
    "name": "Sofitel La Reserva Cardales"
}

describe("<TitleProduct />", () => {
    beforeEach(() => {
        component = render(<Router><TitleProduct {...props} /></Router>)
    })

    it('Renders OK', () => {
        expect(component).toBeDefined();
    })
})