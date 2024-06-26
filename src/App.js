import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";
import { useEffect, useState, useRef, Suspense } from "react";
import { useDispatch } from "react-redux";
import { LOGIN } from "./redux/actions";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import TopNav from "./components/TopNav";
import Home from "./components/Home";
import GuestRoutes from "./components/GuestRoutes";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import DetailsPage from "./components/DetailsPage";
import Dashboard from "./components/Dashboard";
import ViewModel from "./components/ViewModel";
import AddModel from "./components/AddModel";
import EditModel from "./components/EditModel";
import { Canvas } from "@react-three/fiber";
// import { Environment } from "@react-three/drei";
import Optim3 from "./components/Optim3";

import Overlay from "./components/Overlay";

import ProvaGli from "./components/ProvaGli";

import { EffectComposer, SSAO, Bloom } from "@react-three/postprocessing";
import { BlurPass, Resizer, KernelSize, Resolution } from "postprocessing";

function App() {
  const overlay = useRef();
  const caption = useRef();
  const scroll = useRef(0);

  axios.defaults.withCredentials = true;
  axios.defaults.withXSRFToken = true;

  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios("/api/user")
      .then((res) =>
        dispatch({
          type: LOGIN,
          payload: res.data,
        })
      )
      .catch((err) => console.log(err))
      .finally(() => setLoaded(true));
  }, [dispatch]);

  return (
    loaded && (
      <BrowserRouter>
        {/* <TopNav /> */}

        {/* <div className="container"> */}
        <Routes>
          {/* rotte accessibili da tutti */}
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/gli" element={<ProvaGli />} />
          <Route
            path="/"
            element={
              <>
                <Canvas
                  className="intro"
                  // shadows
                  // eventSource={document.getElementById("root")}
                  // eventPrefix="client"
                >
                  {/* <ambientLight intensity={1} /> */}
                  {/* <Suspense fallback={null}> */}
                  {/* <Model scroll={scroll} /> */}
                  <Optim3 scroll={scroll} />
                  {/* <EffectComposer smaa></EffectComposer> */}
                  <EffectComposer>
                    <Bloom
                      intensity={0.2} // The bloom intensity.
                      // blurPass={undefined} // A blur pass.
                      // kernelSize={KernelSize.LARGE} // blur kernel size
                      // luminanceThreshold={0.9} // luminance threshold. Raise this value to mask out darker elements in the scene.
                      // luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
                      // mipmapBlur={false} // Enables or disables mipmap blur.
                      // resolutionX={Resolution.AUTO_SIZE} // The horizontal resolution.
                      // resolutionY={Resolution.AUTO_SIZE} // The vertical resolution.
                    />
                    {/* <SSAO /> */}
                  </EffectComposer>
                  {/* <Environment preset="city" /> */}
                  {/* </Suspense> */}
                </Canvas>
                <Overlay ref={overlay} caption={caption} scroll={scroll} />
              </>
            }
          />
          <Route path="/model3d/:id/:model" element={<ViewModel />} />
          {/* details mostra dettagli */}
          <Route path="/details/:id" element={<DetailsPage />} />

          {/* rotte accessibili solo se sei loggato */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />

            {/* details mostra dettagli */}
            <Route path="/details/:id" element={<DetailsPage />} />
            {/* <Route path="/model3d/:id" element={<ViewModel />} /> */}
            <Route path="/addModel" element={<AddModel />} />

            <Route path="/edit/:id/:model" element={<EditModel />} />
          </Route>

          {/* rotte accessibili solo se NON sei loggato */}
          <Route element={<GuestRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
        {/* </div> */}
      </BrowserRouter>
    )
  );
}

export default App;
