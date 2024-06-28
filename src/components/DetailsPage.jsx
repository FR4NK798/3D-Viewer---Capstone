import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const FacultyPage = () => {
  const [details, setDetails] = useState(null); // null buon candidato
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/geometries/${id}`)
      .then((res) => {
        if (!res.ok) navigate("/404");
        return res.json();
      })
      .then((data) => {
        console.log("dettagli geometria", data);
        setDetails(data.data);
      });
  }, [id]);

  console.log("id", id);
  console.log("details salvati", details);

  return (
    details && (
      <div className="container mt-4 log">
        <Link to={`/`} className="logo">
          <h1>ThreeD Viewer</h1>
        </Link>
        <div className="mt-5">
          <h2 className="mt-5 mb-0 d-inline">Nome modello: </h2>
          <h4 className="d-inline">{details.name}</h4>
        </div>

        <div className="mt-3">
          <h5>Dettagli</h5>
          <div>
            <div>
              <h6 className="d-inline me-2">Descrizione</h6>
              <p className="d-inline">{details.description}</p>
            </div>
            <div>
              <h6 className="d-inline me-2">Software usato:</h6>
              <p className="d-inline">{details.used_sw}</p>
            </div>
            <div>
              <h6 className="d-inline me-2">Data di creazione:</h6>
              <p className="d-inline">{details.date}</p>
            </div>
          </div>

          <Link to={`/model3d/${details.id}/${JSON.stringify(details)}`}>
            <button type="submit" className="mt-2 btLog">
              Visualizza modello
            </button>
          </Link>
        </div>
      </div>
    )
  );
};

export default FacultyPage;
