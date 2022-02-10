function ProfilInfo({ currentUser }) {
 
     
    return (
      <>
        {currentUser===null ?null :currentUser.displayName}
      </>
    );
  }
  export default ProfilInfo;
