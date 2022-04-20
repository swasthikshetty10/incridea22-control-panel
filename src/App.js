import React, { useEffect, useState } from "react";
import ModalContext from "./Context/ModalContext";
import Dashboard from './Compnents/Dashboard';
import { getEvent } from "./firebaseConfig";
import { isLabelWithInternallyDisabledControl } from "@testing-library/user-event/dist/utils";
function App() {
  const [data, setData] = useState(null);
  const getData = async (eventName) => {
    const event = await getEvent(eventName)
    setData(event)
  }
  useEffect(() => {
    getData("hogathon");
  }, [])
  console.log(data)
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
