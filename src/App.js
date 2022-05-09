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
import ParticipantsModal from "./Utility/ParticipantsModal";
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
            
            <Route path="/judge/events" element={<Events role="judge" />} />
            <Route path="/organiser/events" element={<Events role="organiser" />} />
            <Route path="/judge/dashboard/:id/:round" element={
              <ControlPanel />
            } />
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/organiser/dashboard/:id" element={<Dashboard />} />
          </Routes>
        </ModalContext>
      </AuthProvider>
    </Router>
  );
}

export default App;
