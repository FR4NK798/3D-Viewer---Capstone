import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

// pagina che mostra dettagli geometria

const FacultyPage = () => {
  const [course, setCourse] = useState(null); // null buon candidato
  const [details, setDetails] = useState(null); // null buon candidato
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // fetch(`/api/v1/courses/${id}`)

    fetch(`/api/geometries/${id}`)
      .then((res) => {
        if (!res.ok) navigate("/404");
        return res.json();
      })
      .then((data) => {
        console.log("dettagli geometria", data);
        // setCourse(data.data);
        setDetails(data.data);
      });
  }, [id]);

  console.log("id", id);
  console.log("details salvati", details);

  return (
    details && (
      <>
        <h1>{details.name}</h1>

        <h5>Dettagli</h5>
        <div>
          <div>
            <h6>Descrizione</h6>
            <p>{details.description}</p>
            <ul>
              <li>{details.used_sw}</li>
              <li>{details.date}</li>
            </ul>
          </div>
          <div className="btn btn-info">
            <Link to={`/model3d/${details.id}/${JSON.stringify(details)}`}>
              Visualizza modello
            </Link>
          </div>
        </div>
      </>
    )
  );
};

export default FacultyPage;
