import styles from './Button.module.css'
function Button({children, callback, type}) {
    return (
        <button className= {`${styles.btn}  ${styles[type]}`} onClick={callback}>
            {children}
        </button>
    )
}
export default Button
