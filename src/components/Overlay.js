import React, { forwardRef } from "react";
import { useSelector } from "react-redux";

import Home from "./Home";
import TopNav from "./TopNav.jsx";
import Dashboard from "./Dashboard";

const Overlay = forwardRef(({ caption, scroll }, ref) => {
  let user = useSelector((state) => state.user);
  let role = null;
  if (user) {
    role = user.role;
  }

  let site = window.location.href;
  console.log("site", site);

  if (site.endsWith("addModel")) {
    let hide = document.getElementById("root");
    hide.classList.add("overflow-y-scroll");
  } else {
    let hide = document.getElementById("root");
    hide.classList.remove("overflow-y-scroll");
  }

  return (
    <div
      ref={ref}
      onScroll={(e) => {
        scroll.current =
          e.target.scrollTop / (e.target.scrollHeight - window.innerHeight);
        caption.current.innerText = scroll.current.toFixed(2);
      }}
      className="scroll"
    >
      <div style={{ height: "4000vh" }}>
        <div className="dot tran">
          <h1 className="diner">Welcome at ThreeD Viewer Diner</h1>
          <p className="welcome">
            Benvenuti nel progetto Capstone di fine corso di Epicode: ThreeD
            Viewer Il seguente progetto è stato realizzato in React, per la
            tecnologia Front-end. E ho usato Laravel per la parte Back-end, per
            la creazione delle API. Nel corso di questo Capstone ho riscoperto
            l'amore per la modellazione 3D. La parte visiva del Front-end è
            stata realizzata con la libreria: React-Three-Fiber, che è un render
            ThreeJs per React.
          </p>
        </div>
      </div>
      <div style={{ height: "400vh" }}>
        <div className="dot">
          <div id="screen">
            <div className="screen-container">
              <div className="screen-wrapper">
                <div className="screen-wrapper wobblex wobbley overflow-y-scroll">
                  <h1 className="testo">Modelli online</h1>
                  <Home />

                  <div className="screen-wrapper"></div>
                  <canvas className="snow"> </canvas>

                  <canvas className="vcr"> </canvas>

                  <div className="scanlines"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: "900vh" }}>
        <div className="dot">
          <p>
            Scorrendo avanti, troverai la sezione di Login, registrazione e i
            modelli caricati sul tuo profilo.
          </p>
        </div>
      </div>

      <div style={{ height: "200vh" }}>
        <div className="dot">
          {/* <h1>Login</h1> */}
          <TopNav />
        </div>
      </div>
      <div style={{ height: "200vh" }}></div>
      <div style={{ height: "100vh" }}>
        {role === "admin" ? (
          <div className="dot dash">
            <Dashboard />
          </div>
        ) : role === "user" ? (
          <div className="dot user">
            <h1>Dashboard</h1>
            <Dashboard />
          </div>
        ) : (
          <div className="dot dash">
            <Dashboard />
          </div>
        )}
      </div>

      <span className="caption" ref={caption}>
        0.00
      </span>
    </div>
  );
});

export default Overlay;
