import React, { useState, useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { UserContext } from "../App";

const Login = () => {

  const { state, dispatch } = useContext(UserContext)

  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        email, password
      })
    });

    const data = res.json();

    if (res.status === 400 || !data) {
      window.alert("Invalid login user")
    } else {
      dispatch({ type: "USER", payload: true })
      window.alert("Login Successfully Done")
      history.push("/")
    }
  }

  return (
    <>
      <div className="login-form mt-5">
        <form method="POST">
          <h2 className="text-center">Log in</h2>
          <div className="form-group mt-5">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <span className="fa fa-user"></span>
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                name="email"
                required="required"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
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
                type="password"
                className="form-control"
                name="password"
                required="required"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary login-btn btn-block"
              onClick={loginUser}
            >
              Log in
            </button>
          </div>
          <div className="clearfix">
            <label className="float-left form-check-label">
              <input type="checkbox" /> Remember me
            </label>
          </div>
          <div className="or-seperator">
            <i>or</i>
          </div>
          <p className="social text-center">
            Login with your social media account
          </p>
          <div className="text-center social-btn">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              className="btn btn-secondary"
            >
              <i className="fa fa-facebook"></i>&nbsp; Facebook
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              className="btn btn-info"
            >
              <i className="fa fa-twitter"></i>&nbsp; Twitter
            </a>
            <a
              href="https://www.google.com/"
              target="_blank"
              className="btn btn-danger"
            >
              <i className="fa fa-google"></i>&nbsp; Google
            </a>
          </div>
        </form>
        <p className="text-center text-muted small">
          Don't have an account? <NavLink to="/signup">Sign up here!</NavLink>
        </p>
      </div>
    </>
  );
}

export default Login
