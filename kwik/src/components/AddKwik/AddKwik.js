import { addDoc, collection } from "firebase/firestore";
import { db } from "../../db";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useForm } from "react-hook-form";
import s from "./AddKwik.module.css";
import { useState } from "react";
import PopUp from "./PopUp";

function Addmeme({ fetchKwik }) {
  const addKwik = (title, url, file) => {
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
            votes: 0,
            votesUp: 0,
            votesDown: 0,
            date: Date.now()
          }).then(fetchKwik).then(togglePopUp);
        });
      }
    );
  };

  const [message, setMessage] = useState(false);

  const togglePopUp = () => {
    setMessage(!message);
  }

  const {
    register,
    handleSubmit: handleMemeSubmit,
    formState: { errors },
    reset: resetMemeForm,
  } = useForm();

  const onSuccessfulValidation = (values) => {
    const { title, file } = values;
    const kwik = file[0];
    addKwik(title, "", "", kwik);
    resetMemeForm();
    setMessage(true);
  };

  return (
    <div className={s.formForMemesAdding}>
      <form
        className={s.addMemeForm}
        onSubmit={handleMemeSubmit(onSuccessfulValidation)}
      >
        <h1 className={s.headings}>Dodaj Kwika</h1>
        {message && 
          <PopUp
            handleClose={togglePopUp}
            content={
              <div>
                {" "}
                <p>Kwik został poprawnie dodany!</p>
              </div>
            }
          />
        }
        <div className={s.titleAndtagsForm}>
          <input
            className={s.basicInput}
            name="title"
            type="text"
            placeholder="Tytuł"
            aria-label="Tytuł"
            {...register("title", {
              required: { value: true, message: "Wpisz tytuł Kwika" },
              maxLength: {
                value: 40,
                message: "Tytuł może posiadać maksymalnie 40 znaków",
              },
            })}
          />
          {errors.title && <p className={s.error}>{errors.title.message}</p>}

          <input
            className={s.fileInput}
            type="file"
            name="file"
            {...register("file", {
              required: { value: true, message: "Dodaj plik" },
            })}
          />
        </div>
        {errors.file && <p className={s.error}>{errors.file.message}</p>}
        <input type="submit" value="Publikuj" className={s.publishButton}/>
      </form>
    </div>
  );
}

export default Addmeme;
