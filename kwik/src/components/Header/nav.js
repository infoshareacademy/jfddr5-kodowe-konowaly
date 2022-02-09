import s from "./nav.module.css";
import { NavLink } from "react-router-dom";
import kwik from "./kwik.png";
import { signOut } from "firebase/auth";
import { auth } from "../../db";

function Nav(props) {
  return (
    <>
      <div className={s.banner}>
        
        <div className={s.logo}>
          <NavLink to="/">
            <img className={s.kwikLogo} alt="logo" src={kwik}></img>
          </NavLink>
          {props.currentUser ? null
          :
          <div>
            <NavLink to="/AddKwik" className={s.addKwik}>Dodaj kwika</NavLink>
          </div>}
        </div>
        {!props.currentUser ?
          <div className={s.buttons}>

            <NavLink to="/Top">Top</NavLink>
            <NavLink to="/WaitingRoom">Poczekalnia</NavLink>
            <button onClick={()=>signOut(auth)}>wyloguj</button>
        
          </div>
          :<div className={s.buttons}>

          <NavLink to="/Top">Top</NavLink>
          <NavLink to="/WaitingRoom">Poczekalnia</NavLink>
          <NavLink to="/Login">Logowanie</NavLink>
          <NavLink to="/Register">Rejestracja</NavLink>
        </div>}
      </div>
      <hr></hr>
    </>
  );
}
export default Nav;
