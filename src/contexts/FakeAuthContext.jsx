import { createContext, useContext, useReducer } from "react"
const AuthContext = createContext()
const initialState = {
    user: null,
    isLoggedIn: false,
    error: null
}
const reducer = (state, action) => {
    switch (action.type){
        case "login":
            return{
                ...state,
                user: action.payload,
                isLoggedIn: true,
                error: null
            }
        case "logout":
            return {
                ...state,
                user: null,
                isLoggedIn: false,
                error: null
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
    const [{user, isLoggedIn, error}, dispatch] = useReducer(reducer, initialState)
    function Login(email, password){
        if(email === FAKE_USER.email && password === FAKE_USER.password){
            dispatch({type: "login", payload: FAKE_USER})
        }
        else dispatch({type: "error", payload: "Invalid Input data"})
    }
    function Logout(){
        dispatch({type: "logout"})
    }
    return (
        <AuthContext.Provider value = {{
            user,
            isLoggedIn,
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
