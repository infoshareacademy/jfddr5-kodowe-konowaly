function ProfilInfo({ currentUser }) {
 
     
    return (
      <>
        {currentUser===null ?"niezalogowany" :currentUser.displayName}
      </>
    );
  }
  export default ProfilInfo;