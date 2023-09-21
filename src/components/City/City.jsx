import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useCities } from "../../contexts/CityProvider";
import { useEffect } from "react";
import ButtonBack from "../ButtonBack/ButtonBack"
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import { getCityData } from "../../services/apigetcity";


const formatDate = (date) =>
new Intl.DateTimeFormat("en", {
day: "numeric",
month: "long",
year: "numeric",
weekday: "long",
}).format(new Date(date));

function City() {
    const{ id} = useParams()
    const {currentCity, isLoading, dispatch} = useCities()
    const navigate = useNavigate()
    function setCurrentCity(city){
        dispatch({type: "currentCity", payload: city})
    }

    useEffect(function(){
        async function cityDetails(){
            const city = await getCityData(+id)
            if(city.length > 0) return setCurrentCity(city.at(0))
        }
        cityDetails()
    })

    if(isLoading) return <Spinner />
    

    return (
        <div className={styles.city}>
            <div className={styles.row}>
            <h6>City name</h6>
            <h3>
                <span>{currentCity?.emoji}</span> {currentCity?.cityName}
            </h3>
            </div>

            <div className={styles.row}>
            <h6>You went to {currentCity?.cityName} on</h6>
            <p>{formatDate(currentCity?.date || null)}</p>
            </div>

            {currentCity?.notes && (
            <div className={styles.row}>
                <h6>Your notes</h6>
                <p>{currentCity?.notes}</p>
            </div>
            )}

            <div className={styles.row}>
            <h6>Learn more</h6>
            <a
                href={`https://en.wikipedia.org/wiki/${currentCity?.cityName}`}
                target="_blank"
                rel="noreferrer"
            >
                Check out {currentCity?.cityName} on Wikipedia &rarr;
            </a>
            </div>

            <div>
            <ButtonBack callback= {() => { navigate(-1)}}> 
            &larr; &nbsp; Back
            </ButtonBack>
            </div>
    </div>
    );
}

export default City;