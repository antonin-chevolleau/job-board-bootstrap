import { Link } from "./Link";
import style from './modules/Header.module.css'


export function Header() {
    return (
        <header className={style.flex}>
            <div>
                <img src="" alt="" />
            </div>
            <nav>
                <Link href="#" label="Acceuil" className={style.links} />
                <Link href="#" label="Login" className={style.links} />
            </nav>
        </header>
    )
}