import supabase from "./supabase"

export const getCityData = async (id) => {
        const { data: city, error } = await supabase.from('cities').select('*').eq("id", id)
        if(error) throw new Error(error)
        return city
}