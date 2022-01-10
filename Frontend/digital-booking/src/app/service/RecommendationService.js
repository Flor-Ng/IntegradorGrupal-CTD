import url from "../../assets/mocks/urlCofig.json"
import axios from 'axios';

export class RecommendationService {

    async getRecommendationsById(id) {
        let product = null; 
        product = await axios.get(url.link + "/products/" + id) 
        return Promise.resolve(product.data);
    }

    async getAllProducts(){
        let products = null; 
        products = await axios.get(url.link + "/products/list")
        return Promise.resolve(products.data);
    }

    async getRecommendationsByCategory(cat){
        let product = null; 
        product = await axios.get(url.link + "/products/categories?title=" + cat) 
        return Promise.resolve(product.data);
    }

    async getRecommendationsByCity(city){
        let product = null
        product = await axios.get(url.link + "/products/cities?name=" + city) 
        return Promise.resolve(product.data);
    }

    async getRecommendationsByDateAndCity(dateCity){
        let product = null
        product = await axios.get(url.link + "/products/date?startDate=" + dateCity.startDate + "&" + "endDate=" + dateCity.endDate + "&" + "city=" + dateCity.city) 
        return Promise.resolve(product.data);
    }

    async addProduct(reservation, token) {
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
        let response = null;
        response = await axios.post(url.link + "/products/add", reservation) 
        return Promise.resolve(response.status);
    }

    async getInvalidDates(id){
        let dates = null; 
        dates = await axios.get(url.link + "/bookings/product/" + id + "/dates")
        return Promise.resolve(dates.data);
    }
}