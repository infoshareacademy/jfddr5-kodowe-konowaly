import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import {db} from "../../db";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import s from "./AddKwik.module.css";

function Addmeme({ fetchKwik }) {
  const [title, setTitle] = useState("");
  const [kwik, setKwik] = useState("");
  const [nameTag, setNameTag] = useState("");

  const addKwik = (title, url, nameTag, file) => {
    const storage = getStorage();

    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: "image/jpeg",
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);

          addDoc(collection(db, "Kwik"), {
            title: title,
            url: downloadURL,
            nameTag: nameTag,
            votes: 0,
          }).then(fetchKwik);
        });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addKwik(title, "", nameTag, kwik);
    setTitle("");
    setKwik("");
    setNameTag("");
  };

  return (
    <div className={s.formForMemesAdding}>
      <form className={s.addMemeForm} onSubmit={handleSubmit}>
        <h1 className={s.headings}>Dodaj Kwika</h1>
        <div className={s.titleAndtagsForm}>
          <input
            className={s.basicInput}
            type="text"
            placeholder="Tytuł"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className={s.basicInput}
            type="text"
            placeholder="#tagi"
            value={nameTag}
            onChange={(e) => setNameTag(e.target.value)}
          />

          <input
            className={s.fileInput}
            type="file"
            onChange={(e) => setKwik(e.target.files[0])}
          />
        </div>
        <button className={s.publishButton} type="submit">
          Publikuj
        </button>
      </form>
    </div>
  );
}

export default Addmeme;
