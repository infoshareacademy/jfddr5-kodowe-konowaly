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
      <div className={s.menuToggle}>
        <input type="checkbox" id="toggler" />
        <label className={s.toggler} htmlFor="toggler">
          <span></span>
          <span></span>
          <span></span>
        </label>

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
