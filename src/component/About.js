import React, { useEffect, useState } from "react";
import dp from "../images/rahul.jpg";
import edit from "../images/edit.jpg";
import { useHistory } from "react-router-dom";

const About = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({});

  const callAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);
      setUserData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
      history.push("/login");
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <>
      <h2>About Me</h2>
      <div className="container emp-profile mt-5">
        <form className="bandwidth" method="GET">
          <div className="row">
            <div className="col-md-4">
              <div className=" img_div profile-img mt-3 ml-3">
                <img
                  src={userData.name === "Rahul Gupta" ? dp : edit}
                  alt="rahul"
                  width="200px"
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="profile-head mt-3">
                <h5 className="font-weight-bold text-uppercase">{userData.name}</h5>
                <p className="text-secondary">{userData.work}</p>
                <p className="profile-rating mt-3 mb-5 font-weight-bold text-capitalize text-primary">
                  RANKINGS <span> 6/10 </span>
                </p>

                <ul className="nav nav-tabs" role="tablist">
                  <li className="Nav-item mt-3">
                    <a
                      className="nav-link active text-uppercase font-weight-bold"
                      id="home-tab"
                      role="tab"
                      data-toggle="tab"
                      href="#home"
                    >
                      About
                    </a>
                  </li>
                  <li className="Nav-item mt-3">
                    <a
                      className="nav-link text-uppercase font-weight-bold"
                      id="profile-tab"
                      role="tab"
                      data-toggle="tab"
                      href="#profile"
                    >
                      Timeline
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-2 mt-3">
              <input
                type="submit"
                className="profile-edit-btn rounded-top rounded-bottom btn-secondary"
                value="Edit-profle"
              />
            </div>
          </div>
          <div className="container-box">
            <div className="row">
              {/* leftside url */}

              <div className="col-md-4 mt-4">
                <div className="profile-work">
                  <a className="btn1-info table-hover" href="https://www.thapatechnical.com/" target="_thapa">
                    Technical Channel
                </a>
                  <br />
                  <a className="btn1-info table-hover" href="https://github.com/rahulgupta655" target="_thapa">
                    GitHub
                </a>
                  <br />
                  <a className="btn1-info table-hover"
                    href="https://www.linkedin.com/feed/?trk=guest_homepage-basic_nav-header-signin"
                    target="_thapa"
                  >
                    LinkedIn
                </a>
                  <br />
                  <a className="btn1-info table-hover" href="https://www.instagram.com/" target="_thapa">
                    Instagram
                </a>
                  <br />
                </div>
              </div>

              {/* rIghtside data toggle */}
              <div className="col-md-8 pl-4 mt-4 about-info">
                <div className="tab-content profile-tab" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <div className="row emtete">
                      <div className="col-md-6 font-weight-bold">
                        <label>User ID</label>
                      </div>
                      <div className="col-md-6 text-align font-weight-bold text-success">
                        <p>{userData._id}</p>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-6 font-weight-bold">
                        <label>Name</label>
                      </div>
                      <div className="col-md-6 font-weight-bold text-success">
                        <p>{userData.name}</p>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-6 font-weight-bold">
                        <label>Email</label>
                      </div>
                      <div className="col-md-6 font-weight-bold text-success">
                        <p>{userData.email}</p>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-6 font-weight-bold">
                        <label>Phone</label>
                      </div>
                      <div className="col-md-6 font-weight-bold text-success">
                        <p>{userData.phone}</p>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-6 font-weight-bold">
                        <label>Profession</label>
                      </div>
                      <div className="col-md-6 font-weight-bold text-success">
                        <p>{userData.work}</p>
                      </div>
                    </div>
                  </div>
                  {/* timeline */}
                  <div
                    className="tab-pane fade"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    <div className="row">
                      <div className="col-md-6 font-weight-bold">
                        <label>Experience</label>
                      </div>
                      <div className="col-md-6 font-weight-bold text-success">
                        <p>Begineers(Fresher)</p>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-6 font-weight-bold">
                        <label>Hourly Rate</label>
                      </div>
                      <div className="col-md-6 font-weight-bold text-success">
                        <p>10/hr</p>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-6 font-weight-bold">
                        <label>Total Projects</label>
                      </div>
                      <div className="col-md-6 font-weight-bold text-success">
                        <p>05</p>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-6 font-weight-bold">
                        <label>Code Specalization</label>
                      </div>
                      <div className="col-md-6 font-weight-bold text-success">
                        <p>On Average</p>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-6 font-weight-bold">
                        <label>Availabilty</label>
                      </div>
                      <div className="col-md-6 font-weight-bold text-success">
                        <p>Alternate Day</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

    </>
  );
};

export default About
