import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/dom';
import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CardProduct from '../components/CardProduct';

describe("<CardProduct />", () => {
    beforeEach(() => {
        render(<Router><CardProduct /></Router>);
    })
    
    it('Renders OK', () => {
        const component = screen.getByTestId('test-cardproduct');
        expect(component).toBeInTheDocument();
    })
    
    it('Clicking the button calls event handler once', () => {
        const mockHandler = jest.fn()
        const component = screen.getByTestId('test-button');
        expect(component).toBeInTheDocument();
        component.addEventListener('click', mockHandler())
        fireEvent.click(component)
        expect(mockHandler.mock.calls).toHaveLength(1)
        expect(mockHandler).toHaveBeenCalledTimes(1)
    })
})