import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ReservDenied from '../components/ReservDenied';

let component;

describe("<ReservDenied />", () => {
    beforeEach(() => {
        component = render(<Router><ReservDenied /></Router>)
    })

    it('Renders OK', () => {
        expect(component).toBeDefined();
    })
})