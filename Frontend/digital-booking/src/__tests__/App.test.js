import React from 'react';
import App from '../app/App';
import { create } from "react-test-renderer";
import Header from '../app/Header';
import Body from '../app/Body';
import Footer from '../app/Footer';
//import { UserService } from "./service/UserService";

let component;

describe("<App />", () => {
  beforeEach(() => {
    component = create(<App />);
  });

  it("Renders OK", () => {
    expect(component).toBeDefined();
    expect(component.toJSON().type).toEqual("div");
    expect(component.root.findByType(Header)).toBeDefined();
    expect(component.root.findByType(Body)).toBeDefined();
    expect(component.root.findByType(Footer)).toBeDefined();
  });
});