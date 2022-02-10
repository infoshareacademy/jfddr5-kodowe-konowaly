import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Header/nav";
import React from "react";
import AddKwik from "./components/AddKwik/AddKwik";
import LoginRegister from "./components/LoginRegister/LoginRegister";
import {db} from "./db";
import RenderKwiks from "./components/RenderKwiks";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import {auth} from "./db";
import Regulamin from "./Regulamin"
import Polityka from "./Polityka";

function App() {
  const [kwikMainPageArray, setKwikMainPageArray] = useState([]);
  const [kwikTopPageArray, setKwikTopPageArray] = useState([]);
  const [kwikWaitingRoomArray, setKwikWaitingRoomArray] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  

  useEffect(()=>{
    auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      console.warn("authChange", user)
    })
  }, [])

  const getKwik = async () => {
    const kwikCollection = collection(db, "Kwik");
    const kwikDocuments = await getDocs(kwikCollection);

    const kwikList = kwikDocuments.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));

    
    
    const kwikFilteredList = kwikList.filter((kwik) => {
      return kwik.data.votes > 20;
    });

    const kwikWaitingRoomList = kwikList.filter((kwik) => {
      return kwik.data.votes <= 20;
    });

    const kwikSortedList = [...kwikFilteredList].sort((a, b) => {
      return b.data.votes - a.data.votes;
    });

    setKwikMainPageArray(kwikFilteredList);
    setKwikWaitingRoomArray(kwikWaitingRoomList);
    setKwikTopPageArray(kwikSortedList);
    
  };

  useEffect(() => {
    getKwik();
  }, []);

  

  const changeVotes = (id, number, arr, setArr) => {
    const ref = doc(db, "Kwik", id);
    updateDoc(ref, {
      votes: increment(number),
      }).then(() => {
      setArr(arr.map(kwik=>kwik.id===id?({...kwik, data:{...kwik.data, votes:kwik.data.votes+1}}):kwik))
    });

    if(number>0){
      updateDoc(ref, {
        // votes: increment(number),
        votesUp:increment(number),
        // votesDown:increment(number)
      }).then(() => {
        setArr(arr.map(kwik=>kwik.id===id?({...kwik, data:{...kwik.data, votesUp:kwik.data.votesUp+1}}):kwik))
      });
    }
    else if(number<0){
      updateDoc(ref, {
        votesDown:increment(number),
      }).then(() => {
        setArr(arr.map(kwik=>kwik.id===id?({...kwik, data:{...kwik.data, votesDown:kwik.data.votesDown+number}}):kwik))
      });}
  };

  return (
    <BrowserRouter>
      <Nav currentUser={currentUser}/>
      <Routes>
        <Route
          path="/"
          element={
            <RenderKwiks
              kwikArray={kwikMainPageArray}
              changeVotes={changeVotes}
              setKwikMainPageArray={setKwikMainPageArray}
            />
          }
        />
        <Route path="/AddKwik" element={<AddKwik fetchKwik={getKwik} />} />
        <Route
          path="/Top"
          element={
            <RenderKwiks
              kwikArray={kwikTopPageArray}
              changeVotes={changeVotes}
              setKwikMainPageArray={setKwikTopPageArray}
            />
          }
        />
        <Route
          path="/WaitingRoom"
          element={
            <RenderKwiks
              kwikArray={kwikWaitingRoomArray}
              changeVotes={changeVotes}
              setKwikMainPageArray={setKwikWaitingRoomArray}
            />
          }
        />
        <Route path="/Login" element={<LoginRegister currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
        <Route path="/Register" element={<LoginRegister />} />
        <Route path="/Regulamin" element={<Regulamin />} />
        <Route path="/Polityka" element={<Polityka />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;

