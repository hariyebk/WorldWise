import styles from './CityItem.module.css'
import { Link } from 'react-router-dom'
import { useCities } from '../../contexts/CityProvider'
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date))

function CityItem ({city}){
  const {cityName, emoji, date, id, position} = city
  const {currentCity, deleteCity} = useCities()
  const handleClick = (e) => {
    e.preventDefault()
    // We get the Id from each iterations in the cityList component.
    deleteCity(id)
  }
  return <>
    <li>
      <Link className= {`${styles.cityItem} ${currentCity.id === id ? styles["cityItem--active"] : ""}`} to = {`${id}?lat=${position.lat}&lng=${position.lng}`}>
      <span className= {styles.emoji}> {emoji} </span>
      <h3 className= {styles.name}> {cityName} </h3>
      <time className= {styles.date}> {formatDate(date)} </time>
      <button className= {styles.deleteBtn} onClick={handleClick}> &times; </button>
      </Link>
    </li> <br></br>
  </>
}
export default CityItem