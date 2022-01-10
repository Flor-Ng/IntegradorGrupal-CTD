import React from 'react';
import { create } from "react-test-renderer";
import Footer from '../app/Footer';

let component;

describe("<Footer />", () => {
    beforeEach(() => {
        component = create(<Footer />);
    });

    it("Renders OK", () => {
        expect(component).toBeDefined();
        expect(component.toJSON().type).toEqual("div");
    });
});