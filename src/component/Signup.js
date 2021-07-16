import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

const Signup = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });

  let name, value;

  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { name, email, phone, work, password, cpassword } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      }),
    });

    const data = await res.json();

    if (data.status === 422 || !data) {
      window.alert("Invalid Registeration");
      console.log("Invalid Registeration");
    } else {
      window.alert("Registeration Done");
      console.log("Registeration Done");

      history.push("/login");
    }
  };

  return (
    <>
      <div className="signup-form text-center">
        <form method="POST" />
        <h2>Sign Up</h2>
        <p>Please fill in this form to create an account!</p>
        <hr />
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <span className="fa fa-user"></span>
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              name="name"
              required="required"
              value={user.name}
              onChange={handleInputs}
              placeholder="Username"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-paper-plane"></i>
              </span>
            </div>
            <input
              type="email"
              className="form-control"
              name="email"
              required="required"
              value={user.email}
              onChange={handleInputs}
              placeholder="Email Address"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-phone"></i>
              </span>
            </div>
            <input
              type="number"
              className="form-control"
              name="phone"
              required="required"
              value={user.phone}
              onChange={handleInputs}
              placeholder="Phone Number"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-briefcase"></i>
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              name="work"
              required="required"
              value={user.work}
              onChange={handleInputs}
              placeholder="Your Profession"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-lock"></i>
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              name="password"
              required="required"
              value={user.password}
              onChange={handleInputs}
              placeholder="Password"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-lock"></i>
                <i className="fa fa-check"></i>
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              name="cpassword"
              required="required"
              value={user.cpassword}
              onChange={handleInputs}
              placeholder="Confirm Password"
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-check-label">
            <input type="checkbox" required="required" /> I accept the{" "}
            <NavLink to="/login">Terms of Use</NavLink> &amp;{" "}
            <NavLink to="/login">Privacy Policy</NavLink>
          </label>
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            onClick={PostData}
          >
            Sign Up
          </button>
        </div>

        <div className="text-center">
          Already have an account? <NavLink to="/login">Login here</NavLink>
        </div>
      </div>
    </>
  );
}

export default Signup
