import s from "./LoginRegister.module.css";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { registerUserWithEmail, auth } from "../../db";
import { useNavigate } from "react-router-dom";


const LoginRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(auth?.currentUser || null);
  const navigate = useNavigate();


  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm();

  const {
    register: registerNewUser,
    handleSubmit: handleNewUserSubmit,
    formState: { errors: newUserErrors },
    reset: registerFormReset,
  } = useForm();

  const onSubmit = (values) => console.log(values);

  const registerUser = (values) => {
    const {name, email, password} = values
    registerUserWithEmail(name, email, password, setCurrentUser)
    registerFormReset()
  }

  return (
    <div className={s.form}>
      <div className={s.loginForm}>
        <h1 className={s.headings}>Logowanie</h1>

        <form className={s.formForLogin} onSubmit={handleLoginSubmit(onSubmit)}>
          <input
            className={s.basicInput}
            name="name"
            type="text"
            placeholder="Nazwa Użytkownika"
            aria-label="Nazwa Użytkownika"
            {...registerLogin("name", {
              required: { value: true, message: "Wpisz nazwę użytkownika" },
              maxLength: {
                value: 20,
                message:
                  "Nazwa użytkownika może posiadać maksymalnie 20 znaków",
              },
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
        <a href="">Nie pamiętam hasła</a>
      </div>


      <div className={s.registerForm}>
        <h1 className={s.headings}>Rejestracja</h1>
        <form onSubmit={handleNewUserSubmit(registerUser)} >
          <input
            className={s.basicInput}
            type="username"
            name="name"
            placeholder="Nazwa Użytkownika"
            aria-label="Nazwa Użytkownika"
            {...registerNewUser("name", {
              required: { value: true, message: "Wpisz nazwę użytkownika" },
              maxLength: {
                value: 20,
                message:
                  "Nazwa użytkownika może posiadać maksymalnie 20 znaków",
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
              Przeczytałem i akceptuję regulamin oraz politykę prywatności
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
