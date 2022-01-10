import React, { useState, useEffect } from 'react'
import styles from '../../assets/css/home.module.css'
import Search from '../../components/Search'
import CardCateg from '../../components/CardCateg'
import CardRecom from '../../components/CardRecom'
import { CategorieService } from '../../app/service/CategorieService'
import { RecommendationService } from '../service/RecommendationService'
import { addLocale } from 'primereact/api';
import { useLocation, useHistory } from 'react-router-dom'

function Home() {

    const { search } = useLocation()
    const searchParams = new URLSearchParams(search)
    const category = searchParams.get('category')
    const city = searchParams.get('City')
    const datesParam = searchParams.get('Date')
    const history = useHistory()
    const [categories, setCategories] = useState([]);
    const [recommendations, setRecommendations] = useState([])

    const order = (data) => {
        return data.sort((a, b) => {
            return (a.id - b.id)
        })
    }

    useEffect(() => {
        const recomendationsService = new RecommendationService()
        if (city && datesParam) {
            let dates = datesParam.split(" ").map(date => date.replace(/\//g, '-'))
            const param = {startDate: dates[0], endDate: dates[2], city: city}
            recomendationsService.getRecommendationsByDateAndCity(param).then(data => setRecommendations(order(data)))
        }
        else if (category) {
            recomendationsService.getRecommendationsByCategory(category).then(data => setRecommendations(order(data)))
        }
        else if (city) {
            recomendationsService.getRecommendationsByCity(city).then(data => setRecommendations(order(data)))
        }
        else {
            recomendationsService.getAllProducts().then(data => setRecommendations(order(data)))
        }
        const categoriesService = new CategorieService()
        categoriesService.getCategories().then(data => setCategories(order(data)));
    }, [category, city]);

    addLocale('es', {
        firstDayOfWeek: 1,
        dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Hoy',
        clear: 'Claro'
    });


    return (
        <div className={styles.home}>
            <Search />
            <div className={styles.boxAllCards}>
                <div className={styles.categories}>
                    <h2>Categorias</h2>
                    <div className={styles.cardsComp}>
                        {
                            categories.map(category => <CardCateg historyf={history} key={category.title} img={category.urlImage} title={category.title} many={category.description}></CardCateg>)
                        }

                    </div>
                </div>

                <div className={styles.recomm}>
                    <h2>{category ? category : city ? city : "Recomendaciones"}</h2>
                    <div className={styles.recommBox}>
                        {
                            recommendations.map(recomm => <CardRecom id={recomm.id} key={recomm.id} img={recomm.images && recomm.images[0]? recomm.images[0].url : ""} title={recomm.name} category={recomm.categories.title} location={recomm.city.name.concat(" " + recomm.city.country)} description={recomm.description} ></CardRecom>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home