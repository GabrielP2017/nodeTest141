import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth'

const LandingPageWithAuth = Auth(LandingPage, null);
const LoginPageWithAuth = Auth(LoginPage, false);
const RegisterPageWithAuth = Auth(RegisterPage, false);


function App() {

  return (
    <Router>
      <div>
        <Routes>
          {/* <Route exact path="/" element = {<LandingPage />} /> 과거 버전 auth 적용 하기 전임. */}
          <Route exact path="/" element={<LandingPageWithAuth />} />
          <Route exact path="/Login" element={<LoginPageWithAuth />} />
          <Route exact path="/register" element={<RegisterPageWithAuth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;