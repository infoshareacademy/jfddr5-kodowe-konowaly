import s from "./LoginRegister.module.css";
import { useState, useEffect } from "react";
import { registerUserWithEmail, auth } from "../../db"
import { useNavigate } from "react-router-dom";



const LoginRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(auth?.currentUser || null);
  const navigate = useNavigate();




  const registerUser = (e) =>{
    e.preventDefault()
    registerUserWithEmail(name, email, password, setCurrentUser)
    setName('');
    setPassword('');
    setEmail('');
  }

// function success(message) {
//     return { type: alertConstants.SUCCESS, message };
// }
//   const alertConstants = {
//   'USERS_REGISTER_SUCCESS'
// }
  
  return (
    <div className={s.form}>
      <div className={s.loginForm}>
        <h1 className={s.headings}>Logowanie</h1>
        <input
          className={s.basicInput}
          type="text"
          placeholder="Nazwa Użytkownika"
        />
        <input className={s.basicInput} type="password" placeholder="Hasło" />
        <button type="login" className={s.loginButton}>
          Zaloguj
        </button>
        <br></br>
        <a href="">Nie pamietam hasła</a>
      </div>




      <div className={s.registerForm}>
        <h1 className={s.headings}>Rejestracja</h1>
        <form onSubmit={registerUser}>
          <input
            className={s.basicInput}
            type="username"
            placeholder="Nazwa Użytkownika"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
          <input value={email} onChange={(e)=>setEmail(e.target.value)} className={s.basicInput} type="email" placeholder="Email" />
          <input value={password} onChange={(e)=>setPassword(e.target.value)} className={s.basicInput} type="password" placeholder="Hasło" />
          <div className={s.checkbox}>
            <input type="checkbox" id="check" name="check" />
            <label for="check">
              Przeczytałem i akceptuję regulamin oraz politykę prywatności
            </label>
          </div>
          <button type="submit" className={s.registerButton}>Zarejestruj się </button>
        </form>
      </div>
    </div>
  );
};

export default LoginRegister;
