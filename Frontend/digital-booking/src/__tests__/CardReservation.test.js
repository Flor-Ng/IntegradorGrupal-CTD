import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CardReservation from '../components/CardReservation';
import { prettyDOM } from '@testing-library/dom';

let component;

describe("<CardReservation />", () => {
    beforeEach(() => {
        component = render(<Router><CardReservation ></CardReservation></Router>)
    })

    it('Renders OK', () => {
        expect(component).toBeDefined();
    })

    it('The reservation form must be present', () => {
        const reservationForm = screen.getByTestId('test-reservation-form');
        expect(reservationForm).toBeInTheDocument();
        console.log(prettyDOM(reservationForm))
        expect(reservationForm).toHaveTextContent(/Seleccioná tu fecha de reserva/i)
        expect(reservationForm).toHaveTextContent(/Ciudad/i)
        expect(reservationForm).toHaveTextContent(/Correo electrónico/i)
        expect(reservationForm).toHaveTextContent(/Apellido/i)
        expect(reservationForm).toHaveTextContent(/Nombre/i)
    })
    
    it('The reservation must have the politics', () => {
        const politics = screen.getByTestId('test-politics');
        expect(politics).toBeInTheDocument();
        console.log(prettyDOM(politics))
    })
})