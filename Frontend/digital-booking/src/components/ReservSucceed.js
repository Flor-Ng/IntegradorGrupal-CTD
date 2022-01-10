import styles from '../assets/css/succeed.module.css'
import { FaCheckCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

function ReservSucceed() {

    return(
        <div className={styles.container}>
            <div className={styles.card}>
                <FaCheckCircle className={styles.icon} />
                <h2 className={styles.title}>¡Muchas gracias!</h2>
                <h3 className={styles.subTitle}>Su reserva se ha realizado con éxito</h3>
                <Link to="/">
                    <button className={styles.button}>Ok</button>
                </Link>
            </div>
        </div>
    )

}

export default ReservSucceed;