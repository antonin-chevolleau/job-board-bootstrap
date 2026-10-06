import style from "./Create.module.css"
import { useState } from "react";
import { Link } from 'react-router-dom'

export default function Create() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleLogin(event) {
        event.preventDefault()

        const reponse = await fetch("http://localhost:3000/Create", {
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
                <label htmlFor="" className={style.label}>Saisir votre e-mail</label>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className={style.input} />
                <label htmlFor="" className={style.label}>Saisir votre mot de passe</label>
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className={style.input} />

                <button type="submit" >S'inscrire</button>
                <Link to="/login" className={style.no_compte}>Se connecter</Link>
            </form>
        </div>

    )
}