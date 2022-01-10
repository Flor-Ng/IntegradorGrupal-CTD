import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Loading from '../components/Loading';

let component;

describe("<Loading />", () => {
    beforeEach(() => {
        component = render(<Router><Loading /></Router>)
    })

    it('Renders OK', () => {
        expect(component).toBeDefined();
    })
})