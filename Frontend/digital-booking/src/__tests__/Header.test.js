import React from 'react';
import { Link, Route } from 'react-router-dom';
import { create } from "react-test-renderer";
import { useLocation } from 'react-router-dom'
import Header from '../app/Header';
import NavBar from '../components/NavBar';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';

let component;

describe("<Header />", () => {
    beforeEach(() => {
        component = create(<Router><Route path={`*`}
            render={routeProps => {
                testHistory = routeProps.history
                testLocation = routeProps.location
                return null
            }}><Header /></Route></Router>);
    });

    it("Renders OK", () => {
        expect(component).toBeDefined();
        expect(component.toJSON().type).toEqual("div");
        expect(component.root.findAllByType(Link)).toBeDefined();
        expect(component.root.findByType(NavBar)).toBeDefined();
    });
});