import url from "../../assets/mocks/urlCofig.json"
import axios from 'axios';

export class CategorieService {
    
    async getCategories() {
        let categories = await axios.get(url.link + "/categories/list")
        return Promise.resolve(categories.data);
    }
}