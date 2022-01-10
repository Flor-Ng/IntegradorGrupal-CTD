import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/dom';
import { render } from '@testing-library/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CardRecom from '../components/CardRecom';

let component;

const props = {
    "img": "https://www.ahstatic.com/photos/6519_rokgb_00_p_1024x768.jpg",
    "category": "Hotel",
    "title": "Sofitel La Reserva Cardales",
    "location": "Campana, Buenos Aires",
    "description": "El Sofitel La Reserva Cardales te brinda vacaciones inolvidables en un lindo resort cercado por la naturaleza. Las habitaciones son amplias y con vista para la laguna y el campo..."
}

describe("<CardRecom />", () => {
    beforeEach(() => {
        component = render(<Router><CardRecom {...props} ></CardRecom></Router>)
    })

    it('Renders OK', () => {
        expect(component).toBeDefined();
        component.getAllByText(/sofitel La Reserva Cardales/i)
        expect(component.container).toHaveTextContent(/sofitel La Reserva Cardales/i)
    })
    
    it('Clicking the button calls event handler once', () => {  
        const mockHandler = jest.fn()
        const button = component.container.querySelector('input')
        button.addEventListener('click', mockHandler())
        fireEvent.click(button)
        expect(mockHandler.mock.calls).toHaveLength(1)
        expect(mockHandler).toHaveBeenCalledTimes(1)
    })
})