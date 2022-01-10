import styles from '../assets/css/denied.module.css'
import { FaTimesCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

function ReservDenied() {

    return(
        <div className={styles.container}>
            <div className={styles.card}>
                <FaTimesCircle className={styles.icon} />
                <h2 className={styles.title}>¡Lo sentimos mucho!</h2>
                <h3 className={styles.subTitle}>Su reserva no se ha podido realizar</h3>
                <Link to="/">
                    <button className={styles.button}>Ok</button>
                </Link>
            </div>
        </div>
    )

}

export default ReservDenied;