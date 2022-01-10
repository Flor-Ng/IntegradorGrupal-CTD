import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import MapComponent from '../components/MapComponent';

let component;

const props = {
    latitud: 1234,
    longitud: -5678
}

describe("<MapComponent />", () => {
    beforeEach(() => {
        component = render(<Router><MapComponent {...props} /></Router>);
    });

    it("Renders OK", () => {
        expect(component).toBeDefined();
    });
});