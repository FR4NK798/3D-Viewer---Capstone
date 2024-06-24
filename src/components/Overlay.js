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
        pagina 1
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
