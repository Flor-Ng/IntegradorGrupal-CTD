import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/react';
import { render } from '@testing-library/react';
import Search from '../components/Search';
import Home from '../app/home/Home'
import { BrowserRouter as Router } from 'react-router-dom';

let component;

describe("<Search />", () => {
    beforeEach(() => {
        component = render(<Router><Home><Search /></Home></Router>)
    })

    it('Renders OK', () => {
        expect(component).toBeDefined();
    })
    
    it('Click button functions OK', () => {
        const mockHandler = jest.fn()
        const button = component.getByText('Buscar')
        button.addEventListener('click', mockHandler())
        fireEvent.click(button)
        expect(mockHandler).toHaveBeenCalledTimes(1)
    })
})