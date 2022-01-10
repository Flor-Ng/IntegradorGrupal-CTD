import styles from '../assets/css/product.module.css'
import { Link } from 'react-router-dom'
import { FaChevronLeft } from "react-icons/fa";

function TitleProduct(props){

    const { category, name } = props;

    return(
        <>
            <div className={styles.subHeaderLeft}>
                <h4 className={styles.categoryName}>{category.toUpperCase()}</h4>
                <h3 className={styles.name}>{name}</h3>   
            </div>
            <Link to="/" exact>
                <FaChevronLeft className={styles.iconBack} />
            </Link>
        </>
    )
}
export default TitleProduct