import axios from "axios";
import { useEffect, useState } from "react";
import { parsePath, useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from "../redux/actions";

const Transcript = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [models, setModels] = useState([]);
  const [refesh, setRefesh] = useState(false);

  const user = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    // profile_img: '',
  });

  useEffect(() => {
    axios
      .get("/api/v1/dashboard")
      .then((data) => {
        setModels(data.data.data.geometries);
        console.log("data", data);
        console.log("sei in dashboard");
      })
      .catch((err) => navigate("/"));

    // console.log("course", course);
    // console.log("id", user.id);
  }, [refesh]);

  const deleteGeo = (id) => {
    console.log("premuto delete");

    // gli indirizzi relativi, con il proxy attivo fanno la richiesta a http://localhost:8000/login mascherandolo come indirizzo nello stesso host di react (che nel nostro caso è http://localhost:3000/login)
    axios.delete(`/api/v1/geometries/${id}`).then((res) => {
      console.log("res delete", res);
      setRefesh(!refesh);
    });
  };

  const dettagli = (id) => {};

  const rimanda = (id) => {
    // gli indirizzi relativi, con il proxy attivo fanno la richiesta a http://localhost:8000/login mascherandolo come indirizzo nello stesso host di react (che nel nostro caso è http://localhost:3000/login)
    axios.post(`api/v1/geometries/${id}/resend`).then((res) => {
      console.log("rimanda richiesta pubblicazione");
      setRefesh(!refesh);
    });
  };

  const user_id = user.id;

  console.log("user dashbord", user_id);
  console.log("geometries user", models);

  return (
    <div>
      <Link to={`/addModel`}>Aggiungi modello</Link>
      <h1>Lista modelli</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            {/* <th scope="col">Ruolo</th> */}
            <th scope="col">Stato</th>
          </tr>
        </thead>
        <tbody>
          {models && (
            <>
              {models.map((model, i) => (
                // <div key={i}>
                <tr key={i}>
                  <td>{model.name}</td>
                  {/*
                  {model.users.map((user, i) => {
                    if (user.id === user_id) {
                      console.log("trovato");
                      if (user.pivot.role === "owner") {
                        return <td>Proprietario</td>;
                      }
                      if (user.pivot.role === "collaborator") {
                        return <td>Collaboratore</td>;
                      } else {
                        return <td>Non verificato</td>;
                      }
                    }
                  })} */}

                  {model.status === "accepted" ? (
                    <td>Pubblicato</td>
                  ) : model.status === "reject" ? (
                    <>
                      <td>Rifiutato</td>
                      <Button
                        variant="warning"
                        onClick={() => {
                          rimanda(model.id);
                        }}
                      >
                        Rimanda
                      </Button>
                    </>
                  ) : (
                    <>
                      <td>In attesa</td>
                      <Button
                        variant="warning"
                        onClick={() => {
                          rimanda(model.id);
                        }}
                      >
                        Rimanda
                      </Button>
                    </>
                  )}
                  <Button
                    variant="warning"
                    onClick={() => {
                      deleteGeo(model.id);
                    }}
                  >
                    Elimina
                  </Button>
                  <Link to={`/details/${model.id}`}>Dettagli</Link>
                  <Link to={`/edit/${model.id}/${JSON.stringify(model)}`}>
                    Modifica
                  </Link>
                </tr>
                // </div>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Transcript;

// rafcp
