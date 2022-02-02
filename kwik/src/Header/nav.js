import s from "./nav.module.css";
import { NavLink } from "react-router-dom";
import kwik from "./kwik.png";

function Nav() {
  return (
    <>
      <div className={s.banner}>
        <div className={s.logo}>
        <img className={s.kwikLogo} alt="logo" src={kwik}></img>
          <button className={s.addKwik}>Dodaj kwika</button>
        </div>
        <div className={s.buttons}>
          <button>Topka</button>
          <button>Poczekalnia</button>
          <button>Logowanie</button>
          <button>Rejestracja</button>
        </div>
      </div>
      <hr></hr>
    </>
  );
}

export default Nav;
