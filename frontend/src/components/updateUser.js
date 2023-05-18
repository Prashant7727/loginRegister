import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateUser() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    console.log(params.id);
    let result = await fetch(`http://localhost:5000/updateUser/${params.id}`);
    result = await result.json();
    console.warn(result);
    setFname(result.fname);
    setLname(result.lname);
    setEmail(result.email);
    // setPassword(result.password);
  };

  const UpdateUserr = async () => {
    console.log("ho rha hai");
    let result = await fetch(`http://localhost:5000/updateUser/${params.id}`, {
      method: "PUT",
      body: JSON.stringify({ fname, lname, email }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    await result.json();
    navigate("/updateUser");
  };
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form>
          <h3>User Update</h3>

          <div className="mb-3">
            <label>First name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              onChange={(e) => setFname(e.target.value)}
              value={fname}
            />
          </div>

          <div className="mb-3">
            <label>Last name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              onChange={(e) => setLname(e.target.value)}
              value={lname}
            />
          </div>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          {/* <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div> */}
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={UpdateUserr}
            >
              Update
            </button>
          </div>
          <p className="forgot-password text-right">
            <a href="/sign-in">sign in?</a>
          </p>
        </form>
      </div>
    </div>
  );
}
