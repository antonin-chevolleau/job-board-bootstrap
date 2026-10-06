import style from "./Link.module.css"

export function Link({ href, label}) {
  return <a href={href} className={style.a}>{label}</a>
}
