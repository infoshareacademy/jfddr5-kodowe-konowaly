import { useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import db from "../db";

function Addmeme(fetchKwik) {
  const [Id, setId] = useState("");
  const [Title, setTitle] = useState("");
  const [Kwik, setKwik] = useState("");
  const [NameTag, setNameTag] = useState("");

  const addKwik = async (Id, Title, URL, NameTag) => {
    await setDoc(doc(db, "Kwik", Id), {
      Title,
      URL,
      NameTag,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addKwik(Id, Title, URL, NameTag);
    setTitle("");
    setKwik("");
    setNameTag("");
    setId("");
    fetchKwik();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" />
        <input type="text" placeholder="Nazwa" />
        <input type="text" placeholder="#tagi" />
        <button>Publikuj</button>
      </form>
    </div>
  );
}

export default Addmeme;
