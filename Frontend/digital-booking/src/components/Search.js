import React, { useState, useEffect, useRef } from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import { CitiesService } from '../app/service/CitiesService';
import { Calendar } from 'primereact/calendar';
import styles from '../assets/css/search.module.css';

function Search(){

    let minDate = new Date();
    const calend = useRef()
    const [date, setDate] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [cities, setCities] = useState([]);
    const [filteredCitites, setFilteredCities] = useState([]);
    
    useEffect(() => {
        const citiesService = new CitiesService();
        citiesService.getCities().then(data => setCities(data));
    }, []); 

    const searchCities = (event) => {
        let filteredCities;
        if (!event.query.trim().length) {
            filteredCities = [...cities];
        } else {
            filteredCities = cities.filter(city => {
                return city.name.toLowerCase().indexOf(event.query.toLowerCase()) >= 0;
            });
        }

        setFilteredCities(filteredCities);
    }
    

    return (
        <div className={styles.search}>
            <h1>Busca ofertas en hoteles, casas y mucho más</h1>
            <form className={styles.form}>
                <AutoComplete forceSelection name="City" className={styles.input} placeholder="Ingrese la ciudad" value={selectedCity} completeMethod={searchCities} suggestions={filteredCitites} field="name" onChange={(e) => setSelectedCity(e.value)}/>
                <Calendar name="Date" dateFormat="yy/mm/dd" minDate={minDate} ref={calend} className={styles.input} placeholder= "Check in - Check out"locale="es" id="range" value={date} onChange={(e) => setDate(e.value)} selectionMode="range" readOnlyInput showIcon/>
                <input className={styles.button} type="submit" value="Buscar" />
            </form>
        </div>
    )
}

export default Search