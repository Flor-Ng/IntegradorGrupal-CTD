import styles from '../assets/css/product.module.css'

function PoliticsProduct(props){

    const { norms, health, politics } = props;

    return(
        <>
            <h3 className={styles.title}>Qué tenés que saber</h3>
            <div className={styles.info}>
                <div className={styles.infoContent}>
                    <div className={styles.infoSet}>
                        <h4 className={styles.infoTitle}>Normas de la casa</h4>
                        <div className={styles.infoList}>
                            <p className={styles.infoPoint}>{norms}</p>
                        </div>
                    </div>
                    <div className={styles.infoSet}>
                        <h4 className={styles.infoTitle}>Salud y seguridad</h4>
                        <div className={styles.infoList}>
                            <p className={styles.infoPoint}>{health}</p>
                        </div>
                    </div>
                    <div className={styles.infoSet}>
                        <h4 className={styles.infoTitle}>Política de cancelación</h4>
                        <div className={styles.infoList}>
                            <p className={styles.infoPoint}>{politics}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PoliticsProduct;