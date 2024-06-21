// import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// import FetchComponent from "./components/FetchComponent";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
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

// prova
import UploadForm from "./components/UploadForm";

import { useNavigate, useParams } from "react-router-dom";

// per importare modello
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense } from "react";

// per three fiber

import { Canvas, useFrame } from "@react-three/fiber";
import {
  SoftShadows,
  Float,
  CameraControls,
  Sky,
  PerformanceMonitor,
} from "@react-three/drei";

// performance
import { Perf } from "r3f-perf";

import { easing } from "maath";

import { OrbitControls } from "@react-three/drei";

function App() {
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

  // per importare modello
  const Model = () => {
    const gltf = useLoader(GLTFLoader, "/api/download-model");
    return (
      <>
        <primitive object={gltf.scene} scale={1} />
      </>
    );
  };

  return (
    loaded && (
      <BrowserRouter>
        <TopNav />
        {/* <div className="App">
          <Canvas camera={{ fov: 64, position: [-2, 2, 0] }}>
            <Suspense fallback={null}>
              <ambientLight intensity={5} />
              <OrbitControls enableZoom={true} />
              <Model />
            </Suspense>
          </Canvas>
        </div> */}

        <div className="container">
          <Routes>
            {/* rotte accessibili da tutti */}
            <Route path="/" element={<Home />} />
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
        </div>
      </BrowserRouter>
    )
  );
}

export default App;
