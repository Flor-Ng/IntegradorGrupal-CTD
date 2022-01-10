import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { create } from "react-test-renderer";
import { render } from '@testing-library/react';
import NavBar from '../components/NavBar';
import { BrowserRouter as Router } from 'react-router-dom';

let component;

describe("<NavBar />", () => {
    beforeEach(() => {
        component = create(<Router><NavBar /></Router>);
    });

    it('Renders OK', () => {
        expect(component).toBeDefined();
    })
})