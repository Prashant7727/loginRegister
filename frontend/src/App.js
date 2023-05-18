import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import SignUp from "./components/signup";
import UserDetails from "./components/userDetails";
import UpdateUser from "./components/updateUser";
import ImageUpload from "./components/imageUpload";
// import AdminPage from "./components/admin";
// import UserPage from "./components/userPage";

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={isLoggedIn == "true" ? <UserDetails /> : <Login />}
          />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/userDetails" element={<UserDetails />} />
          <Route path="/updateUser/:id" element={<UpdateUser />} />
          {/* <Route path="/admin" element={<AdminPage />} />
          <Route path="/UserPage" element={<UserPage />} /> */}
        </Routes>
        {/* <UserPage /> */}
      </div>
    </Router>
  );
}

export default App;
