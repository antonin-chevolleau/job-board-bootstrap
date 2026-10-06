import { Link as RouterLink } from 'react-router-dom'
import { Link } from '../Link/Link'
import style from './Header.module.css'

export default function Header() {
  return (
    <div className={style.div_header}>
      <div className={style.div_image}>
        <RouterLink to="/">
          <img src="/images/home.png" alt="Accueil" className={style.icon_image} />
        </RouterLink>
      </div>
      <nav className={style.nav}>
        <ul>
          <li><Link href="/" label="Annonces" /></li>
          <li><Link href="/login" label="Login" /></li>
        </ul>
      </nav>
    </div>
  )
}
