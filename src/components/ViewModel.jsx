import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
  const [details, setDetails] = useState(null); // null buon candidato
  const [model3d, setModel3d] = useState(null); // null buon candidato
  const [urlModel, setUrlModel] = useState(null); // null buon candidato
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
        setModel3d(data.geometry_path);
      });

    console.log("objId", objId);
  }, [id]);

  console.log("objId dopo", objId);
  url = `/api/download-model/${userId}/${objId}`;
  console.log("url model", url);
  // per importare modello
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
        {/* </div> */}
      </>
    )
  );
};
export default ViewModel;
