import React, { useContext, useEffect, useState } from "react";
import ModalContext from "./Context/ModalContext";
import Dashboard from './Compnents/Dashboard';
import { AuthContext, AuthProvider } from "./Context/AuthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { getOrganiser } from "./firebaseConfig";
import Login from "./Compnents/Login";
import Events from "./Compnents/Events";
function App() {

  // const getData = async (eventName) => {
  //   const event = await getEvent(eventName)
  //   setData(event)
  // }
  // useEffect(() => {
  //   getData("hogathon");
  // }, [])
  // console.log(data)
  const userCtx = useContext(AuthContext)
  useEffect(() => {
    if (userCtx) {
      getOrganiser(userCtx.currentUser.uid).then(
        (res) => {
          userCtx.setOrganizer(res)
        }
      )

    }

  }, [userCtx])
  return (
    <Router>
      <AuthProvider>
        <ModalContext>

          {/* {
        data ?
        <Dashboard data={data} /> :
        <div>Loading</div>
      } */}
          <Routes>
            <Route path="/events" element={<Events />} />

            <Route path="/dashboard/:id" element={
              <Dashboard />
            } />
            <Route path="/" element={<Login />} />
          </Routes>
        </ModalContext>
      </AuthProvider>
    </Router>
  );
}

export default App;
