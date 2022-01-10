import React from 'react'
import styles from '../assets/css/body.module.css'

function Body(props) {
    return (
        <div className={styles.body}> 
            {props.children}
        </div>
    )
}

export default Body