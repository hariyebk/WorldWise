import { useEffect} from "react"
import { useAuth } from "../contexts/FakeAuthContext"
import { getuser } from "../services/apigetuser"

function ProtectRoute({ children }) {
    const { dispatch } = useAuth();
    function setLogin(user) {
        dispatch({ type: 'login', payload: user });
    }
    useEffect(() => {
    const authorize = async () => {
    const user = await getuser()
    if (user?.role === 'authenticated') return setLogin(user);
    };
    authorize()
    })
    
    return children;
}

export default ProtectRoute
