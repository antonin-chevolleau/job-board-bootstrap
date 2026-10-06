import style from "./Login.module.css"
import { useState } from "react";


export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleLogin(event) {
        event.preventDefault()

        const reponse = await fetch("http://localhost:3000/login", {
            method: "POST",
            header: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });
        const data = await Response.json();
        console.log(data);
    }

    return (
        <div className={style.div}>
            <form onSubmit={handleLogin} className={style.div_identifier}>
                <label htmlFor="">Login</label>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <label htmlFor="">Password</label>
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />

                <button type="submit" >Se connecter</button>
            </form>
        </div>

    )
}