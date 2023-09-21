import styles from "./User.module.css";
import { useAuth } from "../../contexts/FakeAuthContext";

function User() {
  const {user, isLoggedIn, Logout} = useAuth()

  function handleClick() {
    localStorage.removeItem('sb-srxjhuqpxqfrowinlphx-auth-token')
    Logout()
  }
  if(!isLoggedIn) return
  return<div className={styles.user}>
      <span>Welcome, {user?.email?.split("@")?.at(0)}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
}

export default User;

/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.jsx`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/
