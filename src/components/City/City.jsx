import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useCities } from "../../contexts/CityProvider";
import { useEffect } from "react";
import ButtonBack from "../ButtonBack/ButtonBack"
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";


const formatDate = (date) =>
new Intl.DateTimeFormat("en", {
day: "numeric",
month: "long",
year: "numeric",
weekday: "long",
}).format(new Date(date));

function City() {
    const {currentCity, getCityData, isLoading} = useCities()
    const navigate = useNavigate()
    // const [SearchParams, setSearchParams] = useSearchParams()
    // const lat = SearchParams.get("lat")
    // const lng = SearchParams.get("lng")

    const{ id} = useParams()
    useEffect(function(){
        getCityData(id)
    }, [id])

// // TEMP DATA
// const currentCity = {
// cityName: "Lisbon",
// emoji: "🇵🇹",
// date: "2027-10-31T15:59:59.138Z",
// notes: "My favorite city so far!",
// };
// console.log(currentCity)
const { cityName, emoji, date, notes} = currentCity;
if(isLoading) return <Spinner />

return (
        <div className={styles.city}>
            <div className={styles.row}>
            <h6>City name</h6>
            <h3>
                <span>{emoji}</span> {cityName}
            </h3>
            </div>

            <div className={styles.row}>
            <h6>You went to {cityName} on</h6>
            <p>{formatDate(date || null)}</p>
            </div>

            {notes && (
            <div className={styles.row}>
                <h6>Your notes</h6>
                <p>{notes}</p>
            </div>
            )}

            <div className={styles.row}>
            <h6>Learn more</h6>
            <a
                href={`https://en.wikipedia.org/wiki/${cityName}`}
                target="_blank"
                rel="noreferrer"
            >
                Check out {cityName} on Wikipedia &rarr;
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