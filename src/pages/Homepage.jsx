import styles from "./Homepage.module.css";
import {Link} from "react-router-dom"
import PageNav from "../components/PageNav/PageNav"
import { useAuth } from "../contexts/FakeAuthContext";
export default function Homepage() {
  const {isLoggedIn} = useAuth()
  return (
    <main className={styles.homepage}>
      <PageNav/>
      <section>
        <h1>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        <Link to = {isLoggedIn ? "/app" : "/login"} className="cta"> Start Tracking now </Link>
      </section>
    </main>
  );
}