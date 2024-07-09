import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { server } from "./main";
import toast, { Toaster } from "react-hot-toast";

const CreateUser = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [age, setAge] = useState();
  const [btnloading,setBtnLoading] = useState(false)

  // const navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();
    setBtnLoading(true)
    axios
      .post(`${server}/createUser`, { name, email, age })
      .then((result) => {
        // alert("user create successfull");
        // navigate("/");
        toast.success(result.data.message);
        setName("");
        setEmail("");
        setAge("");
        setBtnLoading(false)
      })
      .catch((err) => {
        // console.log(err);
        if (err.response && err.response.status === 500) {
          toast.error(err.response.data.message);
        }
        setBtnLoading(false);
      });  
  };
  return (
    <>
      <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
          <form onSubmit={Submit}>
            <h2>Add User</h2>
            <div className="mb-3">
              <label htmlFor="name">Name</label>
              <input
                type="tetx"
                placeholder="Enter Name"
                className="form-control"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                className="form-control"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name">Age</label>
              <input
                type="text"
                placeholder="Enter Age"
                className="form-control"
                required
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                }}
              />
            </div>
            <button disabled={btnloading} type="submit" className="btn btn-success">
             {btnloading ? "please wait...." : "Submit"}
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

export default CreateUser;
