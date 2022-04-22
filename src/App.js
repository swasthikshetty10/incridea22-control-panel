import React, { useEffect, useState } from "react";
import ModalContext from "./Context/ModalContext";
import Dashboard from './Compnents/Dashboard';
import { getEvent, db } from "./firebaseConfig";
import { AuthProvider } from "./Context/AuthContext";
import { BrowserRouter } from 'react-router-dom';
import {
  collection, onSnapshot
} from 'firebase/firestore'
import Login from "./Compnents/Login";
function App() {
  const eventName = "capture the flag"
  const [data, setData] = useState(null);
  useEffect(() => {
    const colRef = collection(db, "Events")
    //real time update
    onSnapshot(colRef, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.data().name === eventName) {
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
    <BrowserRouter>
      <AuthProvider>
        <ModalContext>

          {/* {
        data ?
        <Dashboard data={data} /> :
        <div>Loading</div>
      } */}
          <Login />
        </ModalContext>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
