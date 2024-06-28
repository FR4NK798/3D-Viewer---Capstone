import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";

const ViewModel = () => {
  const { model } = useParams();
  const [obj, setObj] = useState(JSON.parse(model));
  const [objId, setObjId] = useState(obj.id);
  const [userId, setUserId] = useState(obj.users[0].id);
  const [details, setDetails] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  console.log("user nav", user);
  console.log("model fornito da dashboard", JSON.parse(model));
  // let userId = model.id;
  let url = null;
  console.log("userId", objId);

  useEffect(() => {
    fetch(`/api/geometries/${id}`)
      .then((res) => {
        if (!res.ok) navigate("/404");
        return res.json();
      })
      .then((data) => {
        console.log("dettagli geometria", data.data.id);
        setDetails(data.data.id);
      });

    console.log("objId", objId);
  }, [id]);

  console.log("objId dopo", objId);
  url = `/api/download-model/${userId}/${objId}`;
  console.log("url model", url);

  const Model = () => {
    const gltf = useLoader(GLTFLoader, url);
    return (
      <>
        <primitive object={gltf.scene} scale={1} />
      </>
    );
  };

  return (
    details && (
      <>
        {/* <div className="App"> */}
        <Canvas camera={{ fov: 64, position: [-2, 2, 0] }}>
          <Suspense fallback={null}>
            <ambientLight intensity={5} />
            <OrbitControls enableZoom={true} />
            <Model />
          </Suspense>
        </Canvas>
        <div className="comand log">
          <div
            className="fs-5"
            id="visible"
            onMouseOver={function classRem() {
              let hide = document.getElementById("hide");
              hide.classList.remove("d-none");
            }}
            onMouseOut={function classAdd() {
              let hide = document.getElementById("hide");
              hide.classList.add("d-none");
            }}
          >
            Comandi:
          </div>

          <div className="d-none" id="hide">
            <ul>
              <li className="fs-6">
                Premi e trascina con il Mouse per muoverti attorno all'oggetto.
              </li>
              <li className="fs-6">
                Usa la rotella del Mouse o lo scorrimento sul Trackpad per
                eseguire uno Zoom-in o uno Zoom-out.
              </li>
              <li className="fs-6">
                Tenendo premuto Alt e Mouse, ti permtte di muoverti nello spazio
                circostante.
              </li>
            </ul>
          </div>
        </div>
        <div className="comand up log" id="uplogo">
          Per visualizzare i comandi, passa il Mouse sopra la sezione Comandi.
        </div>
        <Link to={`/`} className="logo up" id="upid">
          <h1>ThreeD Viewer</h1>
        </Link>
      </>
    )
  );
};
export default ViewModel;
