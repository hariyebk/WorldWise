import styles from './ButtonBack.module.css'
function ButtonBack({callback, children}) {
    return (
        <button className= {`${styles.btn}  ${styles.back}`} onClick={e => {
            e.preventDefault()
            callback()
        }}>
            {children}
        </button>
    )
}

export default ButtonBack
