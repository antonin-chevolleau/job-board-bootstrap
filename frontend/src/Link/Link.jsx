import { Link as RouterLink } from 'react-router-dom'

import style from "./Link.module.css"

export function Link({ href, label}) {
  return <RouterLink to={href} className={style.a}>{label}</RouterLink>
}
