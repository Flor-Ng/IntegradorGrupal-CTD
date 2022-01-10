import CardCateg from '../components/CardCateg';
import { create } from "react-test-renderer";
import React from "react";

let component;

const props = {
    historyf: "",
    "img": "https://dmdiluminacion.com/wp-content/uploads/hotel-lp-012-1200x498.jpg",
    "title": "Hoteles",
    "many": "807.000 Hoteles"
};

describe("<CardCateg />", () => {
    beforeEach(() => {
        component = create(<CardCateg {...props} />);
    });

    it("Renders OK", () => {
        expect(component).toBeDefined();
        expect(component.toJSON().type).toEqual("div");
        expect(component.root.findByType("div")).toBeDefined();
        expect(component.root.findByType("h3")).toBeDefined();
        expect(component.root.findByType("h4")).toBeDefined();
    });
});