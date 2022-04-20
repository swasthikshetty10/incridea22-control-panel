import React, { useEffect, useState } from "react";
import ModalContext from "./Context/ModalContext";
import Dashboard from './Compnents/Dashboard';
import { getEvent, db } from "./firebaseConfig";
import {
  getFirestore, collection, doc, getDocs, addDoc, deleteDoc, query, where, updateDoc, onSnapshot
} from 'firebase/firestore'
function App() {
  const eventName = "hogathon"
  const [data, setData] = useState(null);
  useEffect(() => {
    const colRef = collection(db, "Events")
    //real time update
    onSnapshot(colRef, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.data().name === "hogathon") {
          setData(doc.data())
        }
      })
    })
  }, [])
  // const getData = async (eventName) => {
  //   const event = await getEvent(eventName)
  //   setData(event)
  // }
  // useEffect(() => {
  //   getData("hogathon");
  // }, [])
  // console.log(data)
  return (
    <ModalContext>
      {
        data ?
          <Dashboard data={data} /> :
          <div>Loading</div>
      }
    </ModalContext>

  );
}

export default App;
