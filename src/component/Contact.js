import React, { useEffect, useState } from "react";

const Contact = () => {

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const userContact = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      setUserData({
        ...userData,
        name: data.name,
        email: data.email,
        phone: data.phone,
      });

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userContact();
  }, []);

  let name;
  let value;

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const contactForm = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = userData;

    const res = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
      }),
    });

    const data = await res.json();

    if (!data) {
      window.alert("message not send");
      console.log("message not send");
    } else {
      window.alert("Message Done");
      console.log("Message Done");
      setUserData({ ...userData, message: "" });
    }
  };

  return (
    <>
      <div className="container d-block justify-content-center">
        <h2>contact us</h2>
        <form method="POST" className="adjust mt-4">
          <div className="row-md-6">
            <label for="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail4"
              onChange={handleInputs}
              name="email"
              value={userData.email}
              placeholder="Your email"
            />
          </div>
          <div className="row-md-6 mt-3">
            <label for="inputPassword4" className="form-label">
              Name
            </label>
            <input
              type="name"
              className="form-control"
              id="inputName4"
              onChange={handleInputs}
              name="name"
              value={userData.name}
              placeholder="name"
            />
          </div>
          <div className="row-md-6 mt-3">
            <label for="inputNumber4" className="form-label">
              Phone
            </label>
            <input
              type="number"
              className="form-control"
              id="inputNumber4"
              onChange={handleInputs}
              name="phone"
              value={userData.phone}
              placeholder="number"
            />
          </div>
          <div className="row-12 mt-3">
            <label for="inputAddress" className="form-label">
              Address/Location
            </label>
            <textarea
              type="text"
              className="form-control"
              id="inputAddress"
              placeholder="A/101 Main St, Apt or floor"
            />
          </div>
          <div className="row-12 mt-3">
            <label for="inputAddress2" className="form-label">
              Message
            </label>
            <textarea
              type="text"
              className="form-control"
              id="inputAddress2"
              onChange={handleInputs}
              name="message"
              value={userData.message}
              placeholder="message"
            />
          </div>
          <div className="row-12 mt-4">
            <button type="submit" className="btn btn-primary" onClick={contactForm}>
              Send Details
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default Contact;
