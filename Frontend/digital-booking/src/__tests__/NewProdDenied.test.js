import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NewProdDenied from '../components/NewProdDenied';

let component;

describe("<NewProdDenied />", () => {
    beforeEach(() => {
        component = render(<Router><NewProdDenied /></Router>)
    })

    it('Renders OK', () => {
        expect(component).toBeDefined();
    })
})