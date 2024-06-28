import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";

const EditModel = () => {
  const [details, setDetails] = useState(null); // null buon candidato
  const [geoId, setGeoId] = useState(null); // null buon candidato
  //   const [model, setModel] = useState(null); // null buon candidato
  const { id } = useParams();
  const { model } = useParams();
  const navigate = useNavigate();
  const [obj, setObj] = useState(JSON.parse(model));

  const [formData, setFormData] = useState({
    name: obj.name,
    description: obj.description,
    used_sw: obj.used_sw,
    date: obj.date,
    // role: obj.role,
  });
  const user = useSelector((state) => state.user);

  console.log("user", user);

  console.log("id fornito da dashboard", id);
  console.log("model fornito da dashboard", JSON.parse(model));
  console.log("obj json parse", obj);

  //   useEffect(() => {
  //     fetch(`/api/v1/geometries/${id}`)
  //       .then((res) => {
  //         if (!res.ok) navigate("/404");
  //         return res.json();
  //       })
  //       .then((data) => {
  //         console.log("dettagli geometria", data.data);
  //         setDetails(data.data);
  //         setGeoId(data.data.id);
  //       });
  //   }, [id]);

  const updateInputValue = (ev) => {
    setFormData((oldFormData) => ({
      ...oldFormData,
      [ev.target.name]: ev.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `/api/update-model-info/${id}`,
        formData
      );
      console.log("Model info updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating the model info:", error);
    }
  };

  console.log("details", details);

  return (
    <div className="container mt-4 log">
      <Link to={`/`} className="logo">
        <h1>ThreeD Viewer</h1>
      </Link>
      <h2 className="mt-5 mb-4">Modifica Modello 3D</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <input
            type="text"
            id="name"
            name="name"
            onChange={(ev) => updateInputValue(ev)}
            value={formData.name}
            placeholder="Nome File"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            id="description"
            name="description"
            onChange={(ev) => updateInputValue(ev)}
            value={formData.description}
            placeholder="Descrizione"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            id="used_sw"
            name="used_sw"
            onChange={(ev) => updateInputValue(ev)}
            value={formData.used_sw}
            placeholder="Software usato"
          />
        </div>
        <div className="mb-3">
          <input
            type="date"
            id="date"
            name="date"
            onChange={(ev) => updateInputValue(ev)}
            value={formData.date}
            placeholder="Data"
          />
        </div>

        <button type="submit" className="mt-2 btLog" onClick={handleSubmit}>
          Modifica modello
        </button>
      </form>
    </div>
  );
};
export default EditModel;
