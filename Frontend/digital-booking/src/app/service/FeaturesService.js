import url from "../../assets/mocks/urlCofig.json"
import axios from 'axios';

export class FeaturesService {

    async getFeatures() {
        let feature = null;
        feature = await axios.get(url.link + "/features/list") 
        return Promise.resolve(feature.data);
    }
}