import React from 'react';
import { create } from "react-test-renderer";
import Body from '../app/Body';

let component;

describe("<Body />", () => {
    beforeEach(() => {
        component = create(<Body />);
    });

    it("Renders OK", () => {
        expect(component).toBeDefined();
        expect(component.toJSON().type).toEqual("div");
    });
});