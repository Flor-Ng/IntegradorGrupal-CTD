import React from 'react';
import { render } from '@testing-library/react';
import NewProdSucceed from '../components/NewProdSucceed';
import { BrowserRouter as Router } from 'react-router-dom';

let component;

describe("<NewProdSucceed />", () => {
    beforeEach(() => {
        component = render(<Router><NewProdSucceed /></Router>);
    });

    it("Renders OK", () => {
        expect(component).toBeDefined();
    });
});