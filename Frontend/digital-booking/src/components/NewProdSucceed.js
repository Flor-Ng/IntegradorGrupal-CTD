import styles from '../assets/css/succeed.module.css'
import { FaCheckCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

function NewProdSucceed() {


    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <FaCheckCircle className={styles.icon} />
                <h3 className={styles.subTitle}>Tu propiedad se ha creado con éxito</h3>
                <Link to="/">
                    <button className={styles.button}>Volver</button>
                </Link>
            </div>
        </div>
    )
}

export default NewProdSucceed;