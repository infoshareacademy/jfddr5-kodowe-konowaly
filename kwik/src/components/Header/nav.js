import s from "./nav.module.css";
import { NavLink } from "react-router-dom";
import kwik from "./kwik.png";

import { auth } from "../../db";
import ProfileInfo from "./profileInfo";
import { signOut } from "firebase/auth";

function Nav({ currentUser }) {
  return (
    <>
      <div className={s.banner}>
        <div className={s.logo}>
          <NavLink to="/">
            <img className={s.kwikLogo} alt="logo" src={kwik}></img>
          </NavLink>
          {currentUser ? (
            <NavLink to="/AddKwik" className={s.addKwik}>
              Dodaj kwika
            </NavLink>
          ) : (
            <NavLink to="/LoginRegister" className={s.addKwik}>
              Dodaj kwika
            </NavLink>
          )}
        </div>

        <div className={s.buttons}>
          <NavLink to="/">Strona Główna</NavLink>
          <NavLink to="/Top">Top</NavLink>
          <NavLink to="/WaitingRoom">Poczekalnia</NavLink>
          {currentUser ? (
            <button className={s.signOut} onClick={() => signOut(auth)}>
              Wyloguj
            </button>
          ) : (
            <div className={s.buttons}>
              <NavLink to="/LoginRegister">Logowanie/Rejestracja</NavLink>
            </div>
            
          )}  
          {currentUser &&
          <ProfileInfo className={s.buttons} currentUser={currentUser}/>}
          
        </div>
      
      </div>
      <hr/>
    </>
  );
}
export default Nav;
