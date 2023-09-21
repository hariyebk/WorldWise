// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useReducer, useState } from "react";

import styles from "./Form.module.css";
import Message from "../Message/Message";
import Button from "../Button/Button"
import ButtonBack from "../ButtonBack/ButtonBack";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import Spinner from "../Spinner/Spinner";
import { useCities } from "../../contexts/CityProvider";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const BASE_URL = `https://api.bigdatacloud.net/data/reverse-geocode-client`

const initialState = {
  cityName: "",
  country: "",
  emoji: null
}
const reducer = (state, action) => {
  switch (action.type){
    case "Apidata":
      return {
        ...state,
        cityName: action.payload.cityName,
        country: action.payload.country,
        emoji: action.payload.emoji
      }
    case "cityName" :
      return {
        ...state,
        cityName: action.payload
      }
    default:
      throw new Error("unknown")
  }
}
function Form() {
  const navigate = useNavigate()
  const {lat, lng} = useUrlPosition()
  const {createNewCity, isLoading: Loading} = useCities()
  const [{cityName, country, emoji} , dispatch] = useReducer(reducer, initialState)
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit =  async (e) => {
    e.preventDefault()
    if(!cityName || !date) return
    setIsLoading(true)
    const newCity = {
      cityName,
      country,
      emoji,
      date: date.toISOString(),
      notes,
      position: {
        lat: +lat,
        lng: +lng
      },
    }
    await createNewCity(newCity)
    setIsLoading(false)
    navigate("/app/cities")
  }
  useEffect(function(){
    if(!lat && !lng) return 
    // This function sets the current cityName and the country emoji on the form based on the data recieved from a Reverse geocoding Api when the user clicks somewhere on the map and the current url .
    const citydata = async () => {
      try{
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
        const data = await res.json()
        if(data.locality.startsWith("Etc/GMT")) throw new Error(`That doesn't seem to be a city/country. please somewhere else 😉 `)
        dispatch({type: "Apidata", payload: {
            cityName:  data.city || data.locality,
            country: data.countryName,
            emoji: convertToEmoji(data.countryCode)
      }})
      }
      catch(err){
        setError(false)
      }
      finally{
        setIsLoading(false)
      }
    }
    citydata()

  }, [lat, lng, setIsLoading, dispatch])

  if(!lat && !lng) return <Message message= "start by clickng on the map" />
  if(isLoading) return <Spinner />
  if(error) return <Message message={error} />

  return (
    <form className={`${styles.form} ${Loading ? styles.isLoading : ""}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => dispatch({type: "cityName", payload: e.target.value})}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>
      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>
      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>
      <div className={styles.buttons}>
        <Button type = "primary">
          Add
        </Button>
        <ButtonBack type = "back" callback= {() => navigate("/app/cities")}> 
        &larr; &nbsp; Back
        </ButtonBack>
      </div>
    </form>
  );
}

export default Form;
