import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { prettyDOM } from '@testing-library/dom';
import { render } from '@testing-library/react';
import Home from '../app/home/Home';
import { BrowserRouter as Router } from 'react-router-dom';

let component;

describe('<Home />', () => {
    beforeEach(() => {
        component = render(<Router><Home /></Router>)
    })

    it('Renders OK', () => {
        expect(component).toBeDefined();
    })

    it('Render its children', () => {
        expect(component.container.querySelector('.home')).toBeDefined()
    })
})