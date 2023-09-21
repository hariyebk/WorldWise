import { createContext, useContext, useReducer } from "react"
import supabase from "../services/supabase"
import toast from "react-hot-toast"
const AuthContext = createContext()
const initialState = {
    user: null,
    isLoggedIn: false,
    isLoading: false,
    error: null
}
const reducer = (state, action) => {
    switch (action.type){
        case "loading":
            return{
                ...state,
                isLoading: true
            }
        case "signup":
            return{
                ...state,
                user: action.payload,
                isLoggedIn: true,
                isLoading: false
            }
        case "login":
            return{
                ...state,
                user: action.payload,
                isLoggedIn: true,
                isLoading: false
            }
        case "logout":
            return {
                ...state,
                user: null,
                isLoggedIn: false,
                isLoading: false
            }
        case "error":
            return {
                ...state,
                error: action.payload
            }
        default:
            throw new Error("unkown action type")
    }
}
const FAKE_USER = {
    name: "harun",
    email: "harun@example.com",
    password: "haribk",
    avatar: "https://i.pravatar.cc/100?u=zz",
};
function FakeAuthContextProvider({children}) {
    const [{user, isLoggedIn, isLoading, error}, dispatch] = useReducer(reducer, initialState)
    async function Login(email, password){
        try{
            dispatch({type: "loading"})
            const {data:{user}, error} = await supabase.auth.signInWithPassword({
                email,
                password
            })
            if(error) throw new Error(error)
            dispatch({type: "login", payload: user})
            toast.success("Login successful")
        }
        catch(error){
            dispatch({type: "error", payload: error.message})
        }
    }
    async function Signup(email, password){
        try{
            dispatch({type: "loading"})
            const {data:{user}, error} = await supabase.auth.signUp({
                email,
                password
            })
            if(error){
                toast.error(error.message)
                throw new Error(error)
            } 
            dispatch({type: "signup", payload: user})
            toast.success("Signup successful")

        }
        catch(error){
            dispatch({type: "error", payload: error})
        }
    }
    async function Logout(){
        try{
            dispatch({type: "loading"})
            const {error} = await supabase.auth.signOut()
            if(error) throw new Error(error)
            dispatch({type: "logout"})
            toast.success("Logout successful")
        }
        catch(error){
            dispatch({type: "error", payload: error})
        }
    }
    return (
        <AuthContext.Provider value = {{
            user,
            isLoggedIn,
            isLoading,
            Signup,
            Login,
            Logout,
            dispatch,
            error
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext)
    if(!context) throw new Error("The context consumer was used oustide of the provider")
    return context
}
export {FakeAuthContextProvider, useAuth}
