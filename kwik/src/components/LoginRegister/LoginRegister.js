import s from "./LoginRegister.module.css";
import { useForm } from "react-hook-form";

const LoginRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (values) => console.log(values);
  return (
    <div className={s.form}>
      <div className={s.loginForm}>
        <h1 className={s.headings}>Logowanie</h1>

        <form className={s.formForLoginInput} onSubmit={handleSubmit(onSubmit)} >
          <input
            className={s.basicInput}
            name="name"
            type="text"
            placeholder="Nazwa Użytkownika"
            {...register("name", {
              required: true,
              maxLength: {
                value: 20,
              },
            })}
          />{" "}
          {errors.name && (
            <p>Nazwa użytkownika nie może mieć więcej niż 20 znaków.</p>
          )}
          <input
            name="password"
            className={s.basicInput}
            type="password"
            placeholder="Hasło"
            {...register("password", { 
              required: true,
              minLength: {
                value: 8,
              }
            })}
          />{" "}
          {errors.password && (
            <p>Hasło musi posiadać co najmniej 8 znaków.</p>
          )}
          <input type="submit" value="Zaloguj" className={s.loginButton} />
        </form>
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
