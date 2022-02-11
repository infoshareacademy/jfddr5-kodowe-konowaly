import s from "./LoginRegister.module.css";
import { useForm } from "react-hook-form";
import {
  registerUserWithEmail,
  loginUserWithEmail,
} from "../../db";

import { Link, NavLink, useNavigate } from "react-router-dom";

const LoginRegister = ({ currentUser }) => {
  const navigate = useNavigate();

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset: loginFormReset,
  } = useForm();

  const {
    register: registerNewUser,
    handleSubmit: handleNewUserSubmit,
    formState: { errors: newUserErrors },
    reset: registerFormReset,
  } = useForm();

  const registerUser = (values) => {
    const { name, email, password } = values;
    registerUserWithEmail(name, email, password).then(() => {
      navigate("/");
    });
    loginFormReset();
  };

  const loginUser = (values) => {
    const { email, password } = values;
    console.log(email, password);
    loginUserWithEmail(email, password).then(() => {
      navigate("/");
    });
    registerFormReset();
  };

  return (
    <div className={s.form}>
      <div className={s.loginForm}>
        <h1 className={s.headings}>Logowanie</h1>
        <form
          className={s.formForLogin}
          onSubmit={handleLoginSubmit(loginUser)}
        >
          <input
            className={s.basicInput}
            name="email"
            type="text"
            placeholder="Email"
            aria-label="Email"
            {...registerLogin("email", {
              required: { value: true, message: "Wpisz Email" },

            })}
          />{" "}
          {loginErrors.name && (
            <p className={s.error}>{loginErrors.name.message}</p>
          )}
          <input
            name="password"
            className={s.basicInput}
            type="password"
            placeholder="Hasło"
            aria-label="Hasło"
            {...registerLogin("password", {
              required: { value: true, message: "Wpisz hasło" },
              minLength: {
                value: 8,
                message: "Hasło musi posiadać co najmniej 8 znaków.",
              },
            })}
          />{" "}
          {loginErrors.password && (
            <p className={s.error}>{loginErrors.password.message}</p>
          )}
          <input type="submit" value="Zaloguj" className={s.loginButton} />
        </form>
        <br></br>
        <Link to="/ForgottenPassword">Nie pamiętam hasła</Link>
      </div>

      <div className={s.registerForm}>
        <h1 className={s.headings}>Rejestracja</h1>
        <form onSubmit={handleNewUserSubmit(registerUser)}>
          <input
            className={s.basicInput}
            type="username"
            name="name"
            placeholder="Nazwa Użytkownika"
            aria-label="Nazwa Użytkownika"
            {...registerNewUser("name", {
              required: { value: true, message: "Wpisz nazwę użytkownika" },
              maxLength: {
                value: 50,
                message:
                  "Nazwa użytkownika może posiadać maksymalnie 50 znaków",
              },
            })}
          />
          {newUserErrors.name && (
            <p className={s.error}>{newUserErrors.name.message}</p>
          )}
          <input
            className={s.basicInput}
            type="email"
            name="email"
            placeholder="Email"
            aria-label="Email"
            {...registerNewUser("email", {
              required: { value: true, message: "Wpisz poprawny adres email" },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Nieprawidłowy adres email",
              },
            })}
          />{" "}
          {newUserErrors.email && (
            <p className={s.error}>{newUserErrors.email.message}</p>
          )}
          <input
            className={s.basicInput}
            type="password"
            placeholder="Hasło"
            aria-label="Hasło"
            {...registerNewUser("password", {
              required: { value: true, message: "Wpisz hasło" },
              minLength: {
                value: 8,
                message: "Hasło musi posiadać co najmniej 8 znaków.",
              },
            })}
          />
          {newUserErrors.password && (
            <p className={s.error}>{newUserErrors.password.message}</p>
          )}
          <div className={s.checkbox}>
            <input
              type="checkbox"
              id="check"
              name="check"
              {...registerNewUser("checkbox", {
                required: { value: true, message: "Akceptacja jest wymagana" },
              })}
            />
            <label type="checkbox">
              Przeczytałem i akceptuję{" "}
              <NavLink className={s.rules} to="/Regulamin">regulamin</NavLink> oraz{" "}
              <NavLink  className={s.privacy} to="/Polityka"> politykę prywatności</NavLink>
            </label>
          </div>
          {newUserErrors.checkbox && (
            <p className={s.error}>{newUserErrors.checkbox.message}</p>
          )}
          <input
            type="submit"
            value="Zarejestruj się"
            className={s.registerButton}
          />
        </form>
      </div>
    </div>
  );
};

export default LoginRegister;
