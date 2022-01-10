import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { create } from "react-test-renderer";
import PoliticsProduct from '../components/PoliticsProduct';
import { BrowserRouter as Router } from 'react-router-dom';

let component;

const props = {
    "norms": ["Norm 1", "Norm 2", "Norm 3"],
    "health": ["Health 1", "Health 2", "Health 3"],
    "politics": ["Politic 1", "Politic 2", "Politic 3"]
}

describe("<PoliticsProduct />", () => {
    beforeEach(() => {
        component = create(<Router><PoliticsProduct {...props} /></Router>);
    });
    
    it('Renders OK', () => {
        expect(component).toBeDefined();
    })
})