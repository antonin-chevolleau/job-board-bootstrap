import { Link } from "../Link/Link"
import style from "./Header.module.css"

export default function Header(){
    return (
        <div className={style.div_header}>
            <div className={style.div_image}>
                <a href="index.html"><img src="public/images/home.png" alt="icon_img" className={style.icon_image}/></a>
            </div>
            <nav className={style.nav}>
                <ul>
                    <Link href={"#"} label={"Annonces"}></Link>
                    <Link href={"src/Login/Login.jsx"} label={"Login"}></Link>
                </ul>
            </nav>
        </div>
    )
}
