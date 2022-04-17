import React, { useState } from "react";
import ModalContext from "./Context/ModalContext";
import Dashboard from './Compnents/Dashboard';
import data from './data'
import {/*Function*/ } from './firebaseConfig';
import { getEvent } from "./firebaseConfig";
function App() {
  // const [data , setData] = useState({});
  // const getData = async (eventName) => {
  //   const event = await getEvent(eventName)
  //   setData(event)
  // }

  return (
    <ModalContext>
      <Dashboard data={data} />
    </ModalContext>

  );
}

export default App;
