import React from 'react'
import styles from '../assets/css/loading.module.css'

function Loading() {
    return (
        <div className={styles.boxLoading}>
            <div className={styles.loading} /> 
        </div>
    )
}

export default Loading