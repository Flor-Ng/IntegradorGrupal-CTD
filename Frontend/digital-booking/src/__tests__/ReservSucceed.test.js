import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { create } from "react-test-renderer";
import ReservSucceed from '../components/ReservSucceed';
import { BrowserRouter as Router } from 'react-router-dom';

let component;

describe("<ReservSucceed />", () => {
    beforeEach(() => {
        component = create(<Router><ReservSucceed /></Router>);
    });

    it('Renders OK', () => {
        expect(component).toBeDefined();
    })
})