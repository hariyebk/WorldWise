import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import PageNav from "../components/PageNav/PageNav";
import {useAuth} from "../contexts/FakeAuthContext"
import Message from "../components/Message/Message";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  // jack@example.com  qwerty
  const navigate = useNavigate()
  const {dispatch, Login, isLoggedIn, error} = useAuth()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault()
    if(!email || !password) dispatch({type: "error", payload: "please provide a valid email and password"})
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
          <Button type = "primary">
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}
