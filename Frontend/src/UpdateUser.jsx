import React, { useState, useEffect } from "react";
import { useParams, useNavigate ,Link} from "react-router-dom";
import axios from "axios";
import {server} from "./main"
import toast, { Toaster } from "react-hot-toast";

const UpdateUser = () => {
  const { id } = useParams();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [age, setAge] = useState();
  const [btnloading,setBtnLoading] = useState(false)
  // const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${server}/getUser/` + id)
      .then((result) => {
        // console.log(result);
        setName(result.data.name);
        setEmail(result.data.email);
        setAge(result.data.age);
      })
      .catch((err) => console.log(err));
  }, []);

  const Update = (e) => {
    e.preventDefault();
    setBtnLoading(true)
    axios
      .put(`${server}/updateUser/` + id, { name, email, age })
      .then((result) => {
        // navigate("/");
        toast.success(result.data.message);
        setBtnLoading(false)
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
          <form onSubmit={Update}>
            <h2>Update User</h2>
            <div className="mb-3">
              <label htmlFor="">Name</label>
              <input
                type="tetx"
                placeholder="Enter Name"
                className="form-control"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                className="form-control"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="">Age</label>
              <input
                type="text"
                placeholder="Enter Age"
                className="form-control"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                }}
              />
            </div>
            <button type="submit" className="btn btn-success">
            {btnloading ? "please wait...." : "Update"}
            </button>
            <Link to="/" className="btn btn-danger mx-2">
              Go Back
            </Link>
          </form>
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
      </div>
    </>
  );
};

export default UpdateUser;
