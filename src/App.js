import React from "react";
import ModalContext from "./Context/ModalContext";
import Dashboard from './Compnents/Dashboard';
import data from './data'
import {/*Function*/ } from './firebaseConfig';

function App() {
  return (
    <ModalContext>
      <Dashboard data={data} />
    </ModalContext>

  );
}

export default App;
