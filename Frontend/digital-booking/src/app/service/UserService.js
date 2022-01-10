import url from "../../assets/mocks/urlCofig.json"
import axios from 'axios';

export class UserService {

    async login(credentials) {
        let res = await axios.post(url.link + "/auth/login", credentials) 
        return Promise.resolve(res);
    }

    async register(newUser){
        let res = await axios.post(url.link + "/auth/register", newUser)
        return Promise.resolve(res)
    }

    async dataUser(token){
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
        let user = await axios.get(url.link + "/users/me")
        return Promise.resolve(user.data)
    }
}