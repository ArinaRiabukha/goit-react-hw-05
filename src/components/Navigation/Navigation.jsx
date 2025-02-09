import clsx from "clsx";
import { NavLink } from "react-router-dom"
import s from "./Navigation.module.css"

const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

const Navigation = () => {
  return (
    <div className={s.container}>
    <nav className={s.nav}>
        <NavLink className={buildLinkClass} to="/">Home</NavLink>
        <NavLink className={buildLinkClass} to="/movies">Movies</NavLink>
    </nav>
    </div>
  )
}

export default Navigation