import url from "../../assets/mocks/urlCofig.json"
import axios from 'axios';

export class ReservationService {

    async sendReservation(reservation, token) {
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
        let response = null;
        response = await axios.post(url.link + "/bookings/add", reservation) 
        return Promise.resolve(response.status);
    }
}