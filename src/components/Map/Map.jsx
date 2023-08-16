import { useNavigate} from 'react-router-dom'
import styles from './Map.module.css'
import {useEffect, useState} from "react"
import Search from '../Search/Search'
import { useCities } from '../../contexts/CityProvider'
import Button from "../Button/Button"
import {useGeolocation} from "../../hooks/useGeolocation"
import { MapContainer, TileLayer, Popup, Marker, useMap, useMapEvent } from 'react-leaflet'
import { useUrlPosition } from '../../hooks/useUrlPosition'

function Map() {
    const [position, setPosition] = useState([41, 2])
    const {cities} = useCities()
    const {lat, lng} = useUrlPosition()
    const {position: pos, isLoading, getPosition} = useGeolocation()
    
    useEffect(function(){
        if(lat && lng) setPosition([lat, lng])
    }, [lat, lng])
    useEffect(function(){
        if(pos.lat && pos.lng) setPosition([pos.lat, pos.lng])
    }, [pos])
    return (
        <div className= {styles.mapContainer}>
            <Search setPosition = {setPosition} />
            { !pos.lat && <Button type= "position" callback={() => getPosition()}>
                {isLoading ? "loading...": "use Your position"}
            </Button>}
            <MapContainer center={position} zoom={9} scrollWheelZoom={true}  className = {styles.map}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map(city => <Marker position={[city.position.lat, city.position.lng]} key = {city.id}>
                <Popup>
                    <span> { city.emoji} </span> <span> {city.cityName} </span>
                </Popup>
                </Marker>)
                }
                <MoveCenter position={position} />
                <OpenForm />
            </MapContainer>
        </div>
    )
}

function MoveCenter ({position}){
    const map = useMap()
    map.setView(position)
    return null
}
function OpenForm (){
    const navigate = useNavigate()
    useMapEvent({
        click: e =>  navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    })
}

export default Map
