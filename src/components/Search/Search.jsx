import styles from './Search.module.css'
import {useEffect} from "react"
import useSearch from '../../hooks/useSearch'

function Search({setPosition}) {
    
    const {loc, search, setSearch} = useSearch()
    const handleSearch = (e) => {
        setSearch(e.target.value)
    }
    useEffect(function(){
        if(!loc || [...loc].length === 0) return
        setTimeout(() => {
            setPosition(loc)
        }, 500)
    }, [loc, setPosition])
    
    return (
        <form>
            <input className = {styles.search} type= "search" value={search} onChange={handleSearch} placeholder='search places'/>
        </form>
    )
}

export default Search
