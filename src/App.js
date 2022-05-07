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
            <Route path="/dashboard/:id/:round" element={
              <ControlPanel />
            } />
            <Route path="/" element={<Login />} />
            <Route path="/results/:id" element={<Dashboard />} />
          </Routes>
        </ModalContext>
      </AuthProvider>
    </Router>
  );
}

export default App;
