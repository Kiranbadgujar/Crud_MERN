import axios from "axios";
import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {server} from "./main"
import toast, { Toaster } from "react-hot-toast";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [btnloading,setBtnLoading] = useState(false)

  useEffect(() => {
    axios
      .get(`${server}`)
      .then((result) => setUsers(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    setBtnLoading(true)
    axios
      .delete(`${server}/deleteUser/` + id)
      .then((res) => {
        // alert("User Deleted Successfully");
        toast.success(res.data.message)
        // window.location.reload();
        setUsers(users.filter(user => user._id !== id));
        setBtnLoading(false)
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
          <Link to="/createusers" className="btn btn-success">
            Add +
          </Link>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Sr no.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr key={index}>
                    <td key={index + 1}>{`${index + 1}`}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                    <td>
                      <Link
                        to={`/update/${user._id}`}
                        className="btn btn-primary m-1"
                      >
                        Update
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={(e) => handleDelete(user._id)}
                      >
                        {btnloading ? "please wait...." : "Delete"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              // Define default options
              className: "",
              duration: 5000,
              style: {
                background: "#363636",
                color: "#fff",
              },

              // Default options for specific types
              success: {
                duration: 3000,
                theme: {
                  primary: "green",
                  secondary: "black",
                },
              },
            }}
          />
      </div>
    </>
  );
};

export default Users;
