import CityItem from "../CityItem/CityItem"
import Spinner from "../Spinner/Spinner"
import Message from "../Message/Message"
import styles from './CityList.modules.css'
import { useCities } from '../../contexts/CityProvider'

function CityList() {
    const {cities, isLoading} = useCities()
    if(isLoading) return <Spinner />
    if(!cities.length) {<Message message =  "Add your first city by clicking on the map" />}
    return (
        <ul className= {styles.CityList}>
            {cities.map(city => <CityItem  city = {city} key = {city.id}/>)}
        </ul>
    )
}

export default CityList
