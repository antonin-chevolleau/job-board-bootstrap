import style from "./Login.module.css"
export default function Login() {
    return (
        <div className={style.div}>
            <div className={style.div_identifier}>
                <label htmlFor="">Login</label>
                <input type="text" placeholder="Enter Username" name="uname" required></input>
                <label htmlFor="">Password</label>
                <input type="password" placeholder="Enter your password" name="password" required></input>
            </div>
        </div>
    )
}