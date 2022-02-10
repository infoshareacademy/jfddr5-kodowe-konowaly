function ProfilInfo({ currentUser }) {
  return <>{currentUser === null ? "" : currentUser.displayName}</>;
}
export default ProfilInfo;
