import url from "../../assets/mocks/urlCofig.json"
import axios from 'axios';

export class CitiesService {

    async getCities() {
        let city = null;
        city = await axios.get(url.link + "/cities/list") 
        return Promise.resolve(city.data);
    }
}