import React from 'react'
import styles from '../assets/css/categories.module.css'

function CardCateg(props) {
    const { historyf, title, img, many } = props;
    return (
        <div className = {styles.card} onClick={() => historyf.replace(`/?category=${title}`)}>
            <div className={styles.img} style={{
                backgroundImage: `url("${img}")`
            }}></div>
            <h3>{title}</h3>
            <h4>{many}</h4>
        </div>
    )
}

export default CardCateg