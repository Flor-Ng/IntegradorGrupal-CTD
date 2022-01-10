import React from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NewProduct from '../components/NewProduct';

let component;

describe("<NewProduct />", () => {
    beforeEach(() => {
        component = render(<Router><NewProduct /></Router>);
        
    });

    it("Renders OK", () => {
        expect(component).toBeDefined();
    });

    it('Input value must be correct', () => {
        const input = component.findByTestId("input-property-name")
        input.value = 'Hotel 1'
        //fireEvent.change(input, { target: { value: 'Hotel 1' } })
        expect(input.value).toBe('Hotel 1')
    })
});