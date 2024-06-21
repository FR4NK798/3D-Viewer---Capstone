import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";

import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const [models, setModels] = useState([]); // null buon candidato
  const [auth, setAuth] = useState(null);
  const [refesh, setRefesh] = useState(false);
  const [courseAdmin, setCourseAdmin] = useState([]);
  const [finish, setFinish] = useState(false);
  // const [countPub, setCountPub] = useState(0)

  const count = useRef(0);

  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  const prenota = (id) => {
    console.log("premuto prenota");

    // gli indirizzi relativi, con il proxy attivo fanno la richiesta a http://localhost:8000/login mascherandolo come indirizzo nello stesso host di react (che nel nostro caso è http://localhost:3000/login)
    axios.post(`/api/v1/course/${id}/create`).then((res) => {
      console.log("axios res", res);
      setRefesh(!refesh);
    });
  };

  const accetta = (id) => {
    // gli indirizzi relativi, con il proxy attivo fanno la richiesta a http://localhost:8000/login mascherandolo come indirizzo nello stesso host di react (che nel nostro caso è http://localhost:3000/login)
    axios.post(`api/v1/geometries/${id}/approve`).then((res) => {
      console.log("accetta");
      setRefesh(!refesh);
    });
  };

  const rifiuta = (id) => {
    // gli indirizzi relativi, con il proxy attivo fanno la richiesta a http://localhost:8000/login mascherandolo come indirizzo nello stesso host di react (che nel nostro caso è http://localhost:3000/login)
    axios.post(`api/v1/geometries/${id}/reject`).then((res) => {
      console.log("rifiuta");
      setRefesh(!refesh);
    });
  };

  const admin = () => {
    axios
      .get("/api/v1/dashboard")
      .then((data) => {
        // setCourse(data.data.data.courses);
        console.log("data", data);
      })
      .catch((err) => navigate("/"));

    // console.log("course", course);
    // console.log("id", user.id);
  };

  useEffect(() => {
    axios
      // .get("/api/v1/geometries")
      .get("/api/v1/geometries")
      .then((data) => {
        setModels(data.data.data);
        // setCourseAdmin(data.data.data);
        console.log("data", data.data.data);
      })
      .catch((err) => navigate("/"));
  }, [refesh]);

  console.log("models", models);
  console.log("user", user);

  if (models && user) {
    if (user.role === "admin") {
      console.log("admin");
      return (
        models && (
          <>
            {models.map((model, i) => (
              <ul key={i}>
                {/* <Link to={`/models/${model.id}`}>{model.activity.name}</Link> */}
                {/* {model.location} */}

                <Link to={`/details/${model.id}`}> {model.name} </Link>
                {/*  */}
                <ul>
                  Utente autore modello
                  {model.users.length === 0 ? (
                    <li>Nessun utente</li>
                  ) : (
                    <ul>
                      {model.users.map((user, i) => (
                        // console.log("user", user);
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

// http://localhost:3000/   ----->    http://localhost:8000/
