import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageNav from "../components/PageNav/PageNav";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/FakeAuthContext";
import styles from './Signup.module.css'
import Message from "../components/Message/Message";
import Button from "../components/Button/Button";
import Spinner from "../components/Spinner/Spinner";

function Signup() {
    const navigate = useNavigate()
    const {Signup, isLoggedIn, isLoading} = useAuth()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault()
        if(!email || !password){
        return toast.error("please provide your credentials")
        }
        Signup(email, password)
    }
    useEffect(function(){
        if(isLoggedIn){
        navigate("/app", {replace: true})
        }
    }, [isLoggedIn, navigate])
    
    return(
        <main className={styles.signup}>
            <PageNav />
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.row}>
                <label htmlFor="email">Email address</label>
                <input
                    type="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                </div>
                <div className={styles.row}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                <div>
                    <Button type = "primary" disable = {isLoading}>
                        Signup
                    </Button>
                </div>
            </form>
        </main>
    )
}

export default Signup
