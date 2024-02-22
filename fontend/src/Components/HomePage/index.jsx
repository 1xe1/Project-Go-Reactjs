import React from "react";
import "./index.css";
import "./Cude.css";

const HomePage = () => {
  return (
    <div>
      {/* <section className="section1">
        <div className="section2 w-full">
          <div className="container">
            <div className="cube">
              <div className="diveE" style={{ '--x': -1, '--y': 0 }}>
                <span style={{ '--i': 3 }}></span>
                <span style={{ '--i': 2 }}></span>
                <span style={{ '--i': 1 }}></span>
              </div>
              <div className="diveE" style={{ '--x': 0, '--y': 0 }}>
                <span style={{ '--i': 3 }}></span>
                <span style={{ '--i': 2 }}></span>
                <span style={{ '--i': 1 }}></span>
              </div>
              <div className="diveE" style={{ '--x': 1, '--y': 0 }}>
                <span style={{ '--i': 3 }}></span>
                <span style={{ '--i': 2 }}></span>
                <span style={{ '--i': 1 }}></span>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <div className="flex flex-col justify-around items-center p-20">
        <h1
          className="block-effect text-8xl md:text-9xl lg:text-10xl"
          style={{ "--td": "1.2s" }}
        >
          <div
            className="block-reveal text-gradient1"
            style={{ "--bc": "#4040bf", "--d": ".1s" }}
          >
            Hello
          </div>
          <div
            className="block-reveal"
            style={{ "--bc": "#bf4060", "--d": ".5s" }}
          ></div>
        </h1>

        <div className="info">
          <p className="">This is My Mini Project From Crru Class Cit3518 </p>
          <h5>Mr.Anun Numwong</h5>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
