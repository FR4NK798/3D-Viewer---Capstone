import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Model from "./Model";

import Overlay from "./Overlay";

const AppProva = () => {
  const overlay = useRef();
  const caption = useRef();
  const scroll = useRef(0);
  return (
    <>
      <Canvas
      // shadows
      // eventSource={document.getElementById("root")}
      // eventPrefix="client"
      >
        <ambientLight intensity={1} />
        <Suspense fallback={null}>
          <Model scroll={scroll} />
          {/* <Model /> */}
          {/* <Environment preset="city" /> */}
        </Suspense>
      </Canvas>
      <Overlay ref={overlay} caption={caption} scroll={scroll} />
    </>
  );
};
export default AppProva;
