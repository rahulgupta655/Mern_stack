import React, { useEffect, useState } from "react";

const Home = () => {
  const [userName, setUserName] = useState('');
  const { show, setShow } = useState(false);
  const userHomePage = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      setUserName(data.name);
      setShow(true);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userHomePage();
  }, []);

  return (
    <>
      <div className="home-page">
        <div className="home-div">
          <p className=" text-center font-weight-bold text-dark">WELCOME</p>
          <h1 className=" text-center font-weight-bold text-uppercase text-primary">{userName}</h1>
          <h2 className="font-weight-normal">
            {show
              ? "Happy to see you back!"
              : "WE ARE THE MERN STACK DEVELOPERs!!!"}
          </h2>
        </div>
      </div>
    </>
  );
}

export default Home
