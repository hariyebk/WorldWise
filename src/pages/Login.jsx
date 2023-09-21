import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import PageNav from "../components/PageNav/PageNav";
import {useAuth} from "../contexts/FakeAuthContext"
import Message from "../components/Message/Message";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";
import toast from "react-hot-toast";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  // jack@example.com  qwerty
  const navigate = useNavigate()
  const {Login, isLoggedIn, isLoading, error} = useAuth()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault()
    if(!email || !password){
      return toast.error("please provide your credentials")
    }
    Login(email, password)
  }
  useEffect(function(){
    if(isLoggedIn){
      navigate("/app", {replace: true})
    }
  }, [isLoggedIn, navigate])

  return(
    <main className={styles.login}>
      <PageNav />
    {error ? <Message message = {`${error} ⛔`} /> : null}
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
            Login
          </Button>
        </div>
        <div className= {styles.signup}>
            <span> 
            No account ? &nbsp; sign up here
            </span>
            <NavLink className={styles.ctalink} to = "/signup"> Signup </NavLink>
        </div>
      </form>
    </main>
  );
}
