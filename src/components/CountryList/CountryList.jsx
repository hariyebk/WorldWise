import Spinner from '../Spinner/Spinner'
import Message from '../Message/Message'
import styles from './CountryList.module.css'
import CountryItem from '../CountryItem/CountryItem'
import { useCities } from '../../contexts/CityProvider'

function CountryList() {
    const {cities, isLoading} = useCities()
    if(isLoading) return <Spinner />
    if(!cities.length) <Message message = "Add your first country by clicking on the map" />
    // filtering out countries for redundunt cities.
    const country = cities.reduce((arr, city) => {
        if(!arr.map(el => el.country).includes(city.country)){
            return [...arr, {country: city.country, emoji: city.emoji}]
        }
        else{
            return arr
        }
    } ,[])

    return (
        <ul className= {styles.countryList}>
            {country.map(city => <CountryItem  country = {city} key={city.emoji}/>)}
        </ul>
    )
}

export default CountryList
