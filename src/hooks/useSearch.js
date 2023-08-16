import { useEffect, useState } from "react"

export default function useSearch (){
    const api_key = "pk.eyJ1IjoiaGFyaWJrIiwiYSI6ImNsajV5NjZmbzAxM2Izcmw4Ynh6NmJrN2YifQ.iutumj-D8AjKc0ru48lb2w"
    const [search, setSearch] = useState("")
    const [loc, setLoc] = useState(null)
    useEffect(function(){
        if(search.length < 4) return
        const controller = new AbortController()
        try{
            const geolocation = async () => {
                const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=${api_key}`, {signal: controller.signal})
                const data = await res.json()
                const [lat, lng] = data.features[0]?.center
                setLoc([lng, lat])
            }
            geolocation()
        }
        catch(err){
            if (err.name === "AbortError") alert(err.message)
        }
        return () => {
            controller.abort()
        }
    }, [search, setLoc])

    return {loc, search, setSearch}
}