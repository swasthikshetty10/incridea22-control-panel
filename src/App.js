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
import ControlPanel from './Compnents/ControlPanel'
import Home from "./Compnents/Home";
import JuryEvents from './Compnents/JuryPanel/Events'
import Jury from './Compnents/JuryPanel/index'
import WinnersList from "./Compnents/WinnersList";
function App() {
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
          <Routes>
            <Route path="/events" element={<Events />} />
            <Route path="/judge/dashboard/:id/:round" element={
              <ControlPanel />
            } />
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route exact path="/jury" element={<JuryEvents />} />
            <Route exact path="/jury/dashboard/:id/:round" element={<Jury />} />
            <Route path="/organiser/dashboard/:id" element={<Dashboard />} />
            <Route path="/winners" element={<WinnersList />} />
          </Routes>
        </ModalContext>
      </AuthProvider>
    </Router>
  );
}

export default App;
