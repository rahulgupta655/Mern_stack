import React from "react";
import { NavLink } from "react-router-dom";

const Errorpage = () => {
  return (
    <>
      <div id="not-found">
        <div className="notfound">
          <div className="notfound-404 text-center mt-5">
            <h1>404</h1>
          </div>
          <h2>WE ARE SORRY, PAGE NOT FOUND</h2>
          <p className="mb-5 text-center mt-5">
            The page you are looking for might have been removed had its name
            changed or is temporarily unavailable.
          </p>
          <div className="btn d-block justify-content-center">
            <button className="btn btn- text-capitalize">
              <NavLink to="/">Back To Homepage</NavLink>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Errorpage;
