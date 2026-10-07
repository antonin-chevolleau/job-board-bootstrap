import style from "./Articles.module.css"

export default function Article({ Articlename, Description, Dateannonce }) {

    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")

    // async function handleLogin(event) {
    //     event.preventDefault()

    //     const reponse = await fetch("http://localhost:3000/create", {
    //         method: "POST",
    //         header: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             email: email,
    //             password: password,
    //         }),
    //     });
    //     const data = await Response.json();
    //     console.log(data);
    // }


    return (
        <div className={style.article}>
            <p className={style.nom_article}>{Articlename}</p>
            <p>{Description}</p>
            <p>Date de création : {Dateannonce}</p>
            <div className={style.div_button}>
                <button className={style.button}>Voir détails</button>
            </div>
        </div>
    )
}
