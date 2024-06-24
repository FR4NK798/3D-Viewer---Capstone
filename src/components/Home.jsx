import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";

const Home = () => {
  const [models, setModels] = useState([]);
  const [refesh, setRefesh] = useState(false);
  const count = useRef(0);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const accetta = (id) => {
    axios.post(`api/v1/geometries/${id}/approve`).then((res) => {
      console.log("accetta");
      setRefesh(!refesh);
    });
  };

  const rifiuta = (id) => {
    axios.post(`api/v1/geometries/${id}/reject`).then((res) => {
      console.log("rifiuta");
      setRefesh(!refesh);
    });
  };

  useEffect(() => {
    axios
      .get("/api/v1/geometries")
      .then((data) => {
        setModels(data.data.data);
        // console.log("data", data.data.data);
      })
      .catch((err) => navigate("/"));
  }, [refesh]);

  // console.log("models", models);
  // console.log("user", user);

  if (models && user) {
    if (user.role === "admin") {
      console.log("admin");
      return (
        models && (
          <>
            {models.map((model, i) => (
              <ul key={i}>
                <Link to={`/details/${model.id}`}> {model.name} </Link>
                <ul>
                  Utente autore modello
                  {model.users.length === 0 ? (
                    <li>Nessun utente</li>
                  ) : (
                    <ul>
                      {model.users.map((user, i) => (
                        <>
                          {user.name}
                          <li>
                            Stato :{" "}
                            {model.status === "pending"
                              ? "In Attesa"
                              : model.status === "accepted"
                              ? "Pubblicato"
                              : "Non accettato"}{" "}
                          </li>
                          <Button
                            variant="success"
                            onClick={() => {
                              accetta(model.id);
                            }}
                          >
                            Accetta
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => {
                              rifiuta(model.id);
                            }}
                          >
                            Rifiuta
                          </Button>
                        </>
                      ))}
                    </ul>
                  )}
                </ul>
              </ul>
            ))}
          </>
        )
      );
    } else {
      return (
        models && (
          <>
            {models.map((model, i) => (
              <div key={i}>
                {model.status === "accepted" ? (
                  <Link to={`/details/${model.id}`}> {model.name} </Link>
                ) : (
                  <div style={{ display: "none" }}>
                    {" "}
                    {(count.current = count.current + 1)}
                  </div>
                )}
              </div>
            ))}
            {count.current === models.length ? (
              <h5>Nessun modello Online</h5>
            ) : (
              <></>
            )}
          </>
        )
      );
    }
  } else {
    return (
      models && (
        <>
          {models.length === 0 ? (
            <h5>Nessun modello Online</h5>
          ) : (
            <>
              {models.map((model, i) => (
                <div key={i}>
                  {model.status === "accepted" ? (
                    <Link to={`/details/${model.id}`}> {model.name} </Link>
                  ) : (
                    <div style={{ display: "none" }}>
                      {" "}
                      {(count.current = count.current + 1)}
                    </div>
                  )}
                </div>
              ))}
              {count.current === models.length ? (
                <h5>Nessun modello Online</h5>
              ) : (
                <></>
              )}
            </>
          )}
        </>
      )
    );
  }
};
export default Home;
