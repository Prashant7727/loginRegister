import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import ReactToExcel from "react-html-table-to-excel";
import { useReactToPrint } from "react-to-print";
import { CSVLink } from "react-csv";

export default function UserHome({ userData }) {
  const componentPDF = useRef();
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => Load())();
  }, []);
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };

  async function Load() {
    fetch("http://localhost:5000/getAllUser", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setData(data.data);
      });
  }
  //deleting user

  const deleteUser = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      fetch("http://localhost:5000/deleteUser", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          userid: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.data);
          Load();
        });
    }
  };

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "userData",
  });

  return (
    <div className="auth-wrapper" style={{ height: "auto" }}>
      <div ref={componentPDF} className="auth-inner" style={{ width: "auto" }}>
        <h3>Users Info</h3>
        <CSVLink data={data} className="btn btn-success mb-3">
          Export user data
        </CSVLink>

        <table id="table-to-xls" className="table table-bordered table-dark">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
          {data.map((userData) => {
            return (
              <tr key={userData._id}>
                <td>{userData.fname}</td>
                <td>{userData.lname}</td>
                <td>{userData.email}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteUser(userData._id, userData.fname)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button type="button">
                    <Link className='nav-link text-light' to={"/updateUser/" + userData._id}>Update</Link>
                  </button>
                </td>
              </tr>
            );
          })}
        </table>

        <ReactToExcel
          className="btn btn-success"
          table="table-to-xls"
          filename="excelFile"
          sheet="sheet1"
          buttonText="Export"
        ></ReactToExcel>

        <button className="btn btn-danger" onClick={generatePDF}>
          PDF
        </button>

        <button onClick={logOut} className="btn btn-primary pr-5">
          Log Out
        </button>
      </div>
    </div>
  );
}
