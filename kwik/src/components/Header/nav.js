import s from "./nav.module.css";
import { NavLink } from "react-router-dom";
import kwik from "./kwik.png";
import {auth} from "../../db";
import ProfileInfo from "./profileInfo";
import {signOut } from "firebase/auth"

function Nav({ currentUser }) {
 
  return (
    <>
      <div className={s.banner}>
        <div className={s.logo}>
          <NavLink to="/">
            <img className={s.kwikLogo} alt="logo" src={kwik}></img>
          </NavLink>
          {currentUser
          ?
          <NavLink to="/AddKwik" className={s.addKwik}>Dodaj kwika</NavLink>
            :
          <NavLink to="/Login" className={s.addKwik}>Dodaj kwika</NavLink>}
        </div>
        <div className={s.buttons}>
          <NavLink to="/Top">Top</NavLink>
          <NavLink to="/WaitingRoom">Poczekalnia</NavLink>
          <ProfileInfo currentUser={currentUser}/>
          {currentUser
          ?
          <button onClick={()=> signOut(auth)}>Wyloguj</button>
        :
        <div className={s.buttons}>
            <NavLink to="/Login">Logowanie</NavLink>
            <NavLink to="/Register">Rejestracja</NavLink>
          </div>}
        </div>
      </div>
      <hr></hr>
    </>
  );
}
export default Nav;
