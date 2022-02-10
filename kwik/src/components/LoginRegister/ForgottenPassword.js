import s from "./LoginRegister.module.css";
import { useState } from 'react'

import {

  resetPassword,
  
} from "../../db";

import {  useNavigate } from "react-router-dom";

const ForgottenPassword = ({ currentUser }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    
   
    resetPassword(email);
    navigate("/LoginRegister");
  };

  return (
    <div className={s.form}>
      <div className={s.loginForm}>
        <h1 className={s.headings}>Przypominanie hasła</h1>
    
        <form
          className={s.formForLogin}
          onSubmit={handleSubmit}
        >
          <input
            className={s.basicInput}
            name="email"
            type="text"
            placeholder="Email"
            aria-label="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
           
          />{" "}
        
          <input type="submit" value="Przypomnij" className={s.loginButton} />
        </form>
      </div>
    </div>
  );
};

export default ForgottenPassword;
