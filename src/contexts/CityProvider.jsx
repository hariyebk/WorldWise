import { useContext, useReducer } from "react"
import {useEffect, createContext } from "react"
import supabase from "../services/supabase"
import toast from "react-hot-toast"

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
        case "setcurrentcitytonull":
            return{
                ...state,
                currentCity: null
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
                cities: action.payload,
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
            const { data: cities, error } = await supabase.from('cities').select('*')
            if(error) throw new Error(error)
            dispatch({type: "create new city", payload: cities})
            }
            catch(err){
                dispatch({type: "error"})
            }
        }
        fetchdata()
    }, [])

    const createNewCity = async (newCity) => {
        try{
            dispatch({type: "isLoading"})
            const {error: error1 } = await supabase.from('cities').insert(newCity).select()
            if(error1) throw new Error(error1)
            const { data: cities, error: error2} = await supabase.from('cities').select('*')
            if(error2) throw new Error(error2)
            dispatch({type: "create new city", payload: cities})
            toast.success(`${newCity?.cityName} added to your list`)
        }
        catch(err){
            dispatch({type: "error", payload: err.message})
        }
    }
    const deleteCity = async (id) => {
        try{
            dispatch({type: "isLoading"})
            await supabase.from('cities').delete().eq('id', id)
            const { data: cities, error } = await supabase.from('cities').select('*')
            if(error) throw new Error(error)
            dispatch({type: "create new city", payload: cities})
            toast.success(`city #${id} deleted from your list`)
        }
        catch(err){
            dispatch({type: "error"})
        }
    }

    return (
        <cityContext.Provider value = {{
            cities,
            isLoading,
            dispatch,
            currentCity,
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
