import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";

const Transcript = () => {
  const navigate = useNavigate();
  const [models, setModels] = useState([]);
  const [refesh, setRefesh] = useState(false);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    axios
      .get("/api/v1/dashboard")
      .then((data) => {
        let hide = document.getElementById("spinOther");
        hide.classList.add("d-none");
        setModels(data.data.data.geometries);
        console.log("data", data);
        console.log("sei in dashboard");
      })

      .catch((err) => navigate("/"));
  }, [refesh]);

  const deleteGeo = (id) => {
    console.log("premuto delete");
    axios.delete(`/api/v1/geometries/${id}`).then((res) => {
      console.log("res delete", res);
      setRefesh(!refesh);
    });
  };

  const rimanda = (id) => {
    axios.post(`api/v1/geometries/${id}/resend`).then((res) => {
      console.log("rimanda richiesta pubblicazione");
      setRefesh(!refesh);
    });
  };
  let role = null;
  if (user) {
    const user_id = user.id;
    role = user.role;
    console.log("user dashbord", user_id);
    console.log("user role", role);
  }

  return user ? (
    role === "user" ? (
      <div>
        <Link to={`/addModel`} className="testo mod agg">
          Aggiungi modello
        </Link>
        <h1 className="my-2 text-white">Lista modelli</h1>
        <Table className="mt-4" striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Nome</th>

              <th colSpan={100}>Stato</th>
            </tr>
          </thead>
          <tbody>
            <Spinner
              animation="border"
              // variant="primary"
              // className="d-none"
              id="spinOther"
            />
            {models && (
              <>
                {models.map((model, i) => (
                  <tr key={i}>
                    <td class="align-middle">{model.name}</td>

                    {model.status === "accepted" ? (
                      <td class="align-middle">Pubblicato</td>
                    ) : model.status === "reject" ? (
                      <>
                        <td class="align-middle">Rifiutato</td>
                        <td>
                          <Button
                            className="my-2"
                            variant="warning"
                            onClick={() => {
                              rimanda(model.id);
                            }}
                          >
                            Rimanda
                          </Button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td class="align-middle">In attesa</td>
                        <td>
                          <Button
                            className="my-2"
                            variant="warning"
                            onClick={() => {
                              rimanda(model.id);
                            }}
                          >
                            Rimanda
                          </Button>
                        </td>
                      </>
                    )}
                    <td>
                      <Button
                        className="my-2"
                        variant="danger"
                        onClick={() => {
                          deleteGeo(model.id);
                        }}
                      >
                        Elimina
                      </Button>
                    </td>
                    <td>
                      <Link to={`/details/${model.id}`}>
                        <button className="btn btn-info my-2">Dettagli</button>
                      </Link>
                    </td>
                    <td>
                      <Link to={`/edit/${model.id}/${JSON.stringify(model)}`}>
                        <button className="btn btn-secondary my-2">
                          Modifica
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </Table>
      </div>
    ) : (
      <h4 className="trasl">
        Sei collegato come Admin. Puoi visualizzare (pubblicare e rifiutare) i
        modelli caricati dagli altri utenti sul televisore scorrendo in alto.
      </h4>
    )
  ) : (
    <h4 className="trasl">
      Utente ancora non collegato, esegui il Login o registrati dal Menu della
      tavola calda.
    </h4>
  );
};

export default Transcript;
