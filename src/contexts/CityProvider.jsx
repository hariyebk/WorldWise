import { useContext, useReducer } from "react"
import {useEffect, createContext } from "react"

const cityContext = createContext()
const BASE_URL = `http://localhost:8000`

const initialState = {
    cities: [],
    currentCity: {},
    isLoading: false,
    error: null
}
const reducer = (state, action) => {
    switch (action.type){
        case "isLoading":
            return {
                ...state,
                isLoading: true
            }
        case "error":
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case "currentCity":
            return {
                ...state,
                isLoading: false,
                currentCity: action.payload
            }
        case "create new city":
            return {
                ...state,
                isLoading: false,
                cities: action.payload
            }
        case "delete city":
            return {
                ...state,
                isLoading: false,
                cities: action.payload
            }
        default:
            throw new Error("unkown action type")
    }
}
function CityProvider({children}) {
    const [{cities, isLoading, currentCity}, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        const fetchdata = async () => {
            try{
            dispatch({type: "isLoading"})
            const res = await fetch(`${BASE_URL}/cities`)
            const data = await res.json()
            dispatch({type: "create new city", payload: data})
            }
            catch(err){
                dispatch({type: "error"})
            }
        }
        fetchdata()
    }, [])

    const getCityData = async (id) => {
        try{
            dispatch({type: "isLoading"})
            const res = await fetch(`${BASE_URL}/cities/${id}`)
            const data = await res.json()
            dispatch({type: "currentCity", payload: data})
        }
        catch(err){
            dispatch({type: "error", payload: err.message})
        }
    }
    const createNewCity = async (newCity) => {
        try{
            dispatch({type: "isLoading"})
            const res = await fetch(`${BASE_URL}/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                "Content-Type": "application/json"
                }
            })
            const data = await res.json()
            dispatch({type: "create new city", payload:  [...cities, data]})
        }
        catch(err){
            dispatch({type: "error", payload: err.message})
        }
    }
    const deleteCity = async (id) => {
        try{
            dispatch({type: "isLoading"})
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: "DELETE"
            })
            dispatch({type: "delete city", payload: cities.filter(city => city.id !== id)})
        }
        catch(err){
            dispatch({type: "error"})
        }
    }

    return (
        <cityContext.Provider value = {{
            cities,
            isLoading,
            currentCity,
            getCityData,
            createNewCity,
            deleteCity
        }}>
            {children}
        </cityContext.Provider>
    )
}

function useCities (){
    const context = useContext(cityContext)
    if(!context) throw new Error('please use the useCities hook only inside of the context provider')
    return context
}

export {CityProvider, useCities}
