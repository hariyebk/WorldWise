import { useSearchParams } from "react-router-dom"

export function useUrlPosition (){
    const [SearchParams, setSearchParams] = useSearchParams()
    const lat = SearchParams.get("lat")
    const lng = SearchParams.get("lng")
    return {lat, lng}
}