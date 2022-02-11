import s from "./profileInfo.module.css";
function ProfilInfo({ currentUser }) {
 
     
    return (
      <div className={s.user}>Zalogowany jako: <span>
        {currentUser===null ?null :currentUser.displayName}</span>
      </div>
    );
  }
  export default ProfilInfo;
