import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Optim3 from "./Optim3";

import Overlay from "./Overlay";

// bloom
import { EffectComposer, SSAO, Bloom } from "@react-three/postprocessing";
import { BlurPass, Resizer, KernelSize, Resolution } from "postprocessing";

const AppProva = () => {
  const overlay = useRef();
  const caption = useRef();
  const scroll = useRef(0);
  return (
    <>
      <Canvas
        // shadows
        eventSource={document.getElementById("root")}
        eventPrefix="client"
      >
        <ambientLight intensity={1} />
        <Suspense fallback={null}>
          {/* <Model scroll={scroll} /> */}
          <Optim3 scroll={scroll} />
          <EffectComposer smaa>
            <Bloom
              intensity={0.1} // The bloom intensity.
              blurPass={undefined} // A blur pass.
              kernelSize={KernelSize.LARGE} // blur kernel size
              luminanceThreshold={0.9} // luminance threshold. Raise this value to mask out darker elements in the scene.
              luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
              mipmapBlur={false} // Enables or disables mipmap blur.
              resolutionX={Resolution.AUTO_SIZE} // The horizontal resolution.
              resolutionY={Resolution.AUTO_SIZE} // The vertical resolution.
            />
            <SSAO />
          </EffectComposer>
          {/* <Environment preset="city" /> */}
        </Suspense>
      </Canvas>
      <Overlay ref={overlay} caption={caption} scroll={scroll} />
    </>
  );
};
export default AppProva;
