import styles from "./Navbar.module.scss";

export default function Navbar() {
    return (
        <nav id={styles.navbar}>
            <h1 id={styles.name}>WeatherApp</h1>
        </nav>
    )
}