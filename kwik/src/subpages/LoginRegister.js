export const LoginRegister = () => {
  return (
    <div>
      <div>
        <h1>Logowanie</h1>
        <input type="text" placeholder="Nazwa Użytkownika" />
        <input type="password" />
        <button>Nie pamietam Hasła</button>
        <button>Zaloguj</button>
      </div>

      <div>
        <h1>Rejestracja</h1>
        <input type="text" />
        <input type="email" />
        <input type="password" />
        <input type="checkbox" id="check" />
        <label for="check">
          Przeczytałem i akceptuję regulaminy oraz politykę prywatności
        </label>
        <button>Zarejestruj sie </button>
      </div>
    </div>
  );
};
