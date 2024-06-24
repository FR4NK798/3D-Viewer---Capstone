import React, { forwardRef } from "react";

const Overlay = forwardRef(({ caption, scroll }, ref) => (
  <div
    ref={ref}
    onScroll={(e) => {
      scroll.current =
        e.target.scrollTop / (e.target.scrollHeight - window.innerHeight);
      caption.current.innerText = scroll.current.toFixed(2);
    }}
    class="scroll"
  >
    <div style={{ height: "4000vh" }}>
      <div class="dot">
        <h1>Welcome</h1>
        <p>
          Benvenuti nel progetto Capstone di fine corso di Epicode: ThreeD
          Viewer Il seguente progetto è stato realizzato in React, per la
          tecnologia Front-end. E ho usato Laravel per la parte Back-end, per la
          creazione delle API. Nel corso di questo Capstone ho riscoperto
          l'amore per la modellazione 3D. La parte visiva del Front-end è stata
          realizzata con la libreria: React-Three-Fiber, che è un render ThreeJs
          per React.
        </p>
      </div>
    </div>
    <div style={{ height: "400vh" }}>
      <div class="dot">
        <h1>Modelli online</h1>
        modelli online
      </div>
    </div>
    <div style={{ height: "700vh" }}>
      <div class="dot">
        <h1>spazio vuoto</h1>
      </div>
    </div>

    <div style={{ height: "200vh" }}>
      <div class="dot">
        <h1>Login</h1>
      </div>
    </div>
    <div style={{ height: "300vh" }}>
      <div class="dot">
        <h1>Spazio vuoto</h1>
      </div>
    </div>

    <span class="caption" ref={caption}>
      0.00
    </span>
  </div>
));

export default Overlay;
