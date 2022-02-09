import s from "./nav.module.css";
import { NavLink } from "react-router-dom";
import kwik from "./kwik.png";

function Nav() {
  return (
    <div className={s.banner}>
      <div className={s.logo}>
        <div>
          <NavLink to="/">
            <img className={s.kwikLogo} alt="logo" src={kwik}></img>
          </NavLink>
        </div>
        <NavLink to="/AddKwik" className={s.addKwik}>
          Dodaj kwika
        </NavLink>
      </div>
      <div id="menuToggle">
        <input type="checkbox" />
        <span></span>
        <span></span>
        <span></span>
        <div className={s.buttons}>
          <NavLink to="/Top">Top</NavLink>
          <NavLink to="/WaitingRoom">Poczekalnia</NavLink>
          <NavLink to="/Login">Logowanie</NavLink>
          <NavLink to="/Register">Rejestracja</NavLink>
        </div>
      </div>
    </div>
  );
}
export default Nav;
