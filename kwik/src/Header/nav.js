import s from "./nav.module.css";
import { NavLink } from "react-router-dom";
import kwik from "./kwik.png";

function Nav() {
  return (
    <>
      <div className={s.banner}>
        <div className={s.logo}>
          <NavLink to="/">
            <img className={s.kwikLogo} alt="logo" src={kwik}></img>
          </NavLink>
          <NavLink to="/AddKwik">
            <button className={s.addKwik}>Dodaj kwika</button>
          </NavLink>
        </div>
        <div className={s.buttons}>
          <NavLink to="/Top">Top</NavLink>
          <NavLink to="/WaitingRoom">Poczekalnia</NavLink>
          <NavLink to="/Login">Logowanie</NavLink>
          <NavLink to="/Register">Rejestracja</NavLink>
        </div>
      </div>
      <hr></hr>
    </>
  );
}
export default Nav;
