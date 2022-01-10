import styles from '../assets/css/denied.module.css'
import { FaTimesCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

function NewProdDenied() {

    return(
        <div className={styles.container}>
            <div className={styles.card}>
                <FaTimesCircle className={styles.icon} />
                <h2 className={styles.title}>¡Lo sentimos mucho!</h2>
                <h3 className={styles.subTitle}>Tu producto no se ha podido crear</h3>
                <Link to="/">
                    <button className={styles.button}>Ok</button>
                </Link>
            </div>
        </div>
    )

}

export default NewProdDenied;