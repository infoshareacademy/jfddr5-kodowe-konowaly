import { useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import db from "../db";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function Addmeme({ fetchKwik }) {
  const [Id, setId] = useState("");
  const [Title, setTitle] = useState("");
  const [Kwik, setKwik] = useState("");
  const [NameTag, setNameTag] = useState("");
  //czy w lini 12 id mozemy ustawic jako aktualny czas (data.now)

  const addKwik = async (Id, Title, URL, NameTag, file) => {
    const storage = getStorage();

    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: 'image/jpeg'
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
          console.log('File available at', downloadURL);
          await setDoc(doc(db, "Kwik", Id), {
            Title,
            URL:downloadURL,
            NameTag,
          });
        });
      }
    );


   
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addKwik(Id, Title, "", NameTag, Kwik);
    setTitle("");
    setKwik("");
    setNameTag("");
    setId("");
    fetchKwik();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={(e) => setKwik(e.target.files[0])} />
        <input type="text" placeholder="NazwaKwika" value={Id} onChange={(e) => setId(e.target.value)} />
        <input type="text" placeholder="Tytuł" value={Title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="#tagi" value={NameTag} onChange={(e) => setNameTag(e.target.value)} />
        <button type="submit">Publikuj</button>
      </form>
    </div>
  );
}

export default Addmeme;
