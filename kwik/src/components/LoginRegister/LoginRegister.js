import s from "./LoginRegister.module.css";

const LoginRegister = () => {
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
        <input
          className={s.basicInput}
          type="username"
          placeholder="Nazwa Użytkownika"
        />
        <input className={s.basicInput} type="email" placeholder="Email" />
        <input className={s.basicInput} type="password" placeholder="Hasło" />
        <div className={s.checkbox}>
          <input type="checkbox" id="check" name="check" />
          <label for="check">
            Przeczytałem i akceptuję regulamin oraz politykę prywatności
          </label>
        </div>
        <button className={s.registerButton}>Zarejestruj się </button>
      </div>
    </div>
  );
};

export default LoginRegister;
