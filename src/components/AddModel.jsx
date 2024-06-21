import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import infoExport from "../infoexpo.png";

const AddModel = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    geometry: "",
    name: "",
    description: "",
    used_sw: "",
    date: "",
    // role: "owner",
  });

  const updateInputValue = (ev) => {
    setFormData((oldFormData) => ({
      ...oldFormData,
      [ev.target.name]: ev.target.value,
    }));
  };

  const updateImageField = (ev) => {
    updateInputValue(ev);
    setProfileImage(ev.target.files[0]);
  };

  const submitLogin = (ev) => {
    ev.preventDefault();
    // gli indirizzi relativi, con il proxy attivo fanno la richiesta a http://localhost:8000/login mascherandolo come indirizzo nello stesso host di react (che nel nostro caso è http://localhost:3000/login)
    axios
      .get("/sanctum/csrf-cookie")
      .then(() => {
        const body = new FormData();
        body.append("geometry", profileImage); // TODO: verify this

        // body.append("geometry_path", formData.geometry_path);
        body.append("name", formData.name);
        body.append("description", formData.description);
        body.append("used_sw", formData.used_sw);
        body.append("date", formData.date);
        // body.append("role", formData.role);
        return axios.post("/api/upload-model", body, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("primo then");
      })

      // .then(() => axios.get("/api/user"))
      .then((res) => {
        console.log("res", res);
        alert(
          "Modello inserito correttamente, verrai riportato nella Dashobard per visualizzarlo"
        );
        const myTimeout = setTimeout(() => {
          console.log("confermato e uscita");

          navigate("/dashboard");
        }, 1250);

        // salvare i dati dello user nel Redux state
      })
      .catch((err) => {
        console.log(err);
        alert("Compilare tutti i campi");
        // setErrors(err.response.data.errors);
      });
  };

  return (
    <>
      <div className="mb-3">
        <h1>Come importare modelli 3D in ThreeD Viewer</h1>
        <h2>Come esportare correttamente il modello da Blender</h2>
        <p>
          Per esportare il modello, abbiamo bisogno di generare un .glb file. Il
          sito si aspetterà per forza questo tipo di file per funzionare
          correttamente. Quindi una volta che hai realizzato il tuo modello,
          animazioni, materiali, colori e altro, puoi fare le seguenti cose:
        </p>
        <ol>
          <li>
            Clicca sulla tabella <strong>File</strong> localizzata nell'angolo
            in alto a sinistra.
          </li>
          <li>
            Dal menù a comparsa clicca su <strong>Export</strong>. Ora hai una
            varietà di opzioni di esportazione di formati.
          </li>
          <li>
            Come menzionato prima, clicca sull`opzione glTF 2.0 (.glb/.gltf).
          </li>
        </ol>
        <p>
          Dopo aver selezionato quest'opzione, comparirà una nuova finistra.
          Questa schermata ti farà scegliere la cartella della destinazione dove
          salvare il file.
        </p>
        <p>
          Nella sezione di destra della finestra, ci sono scelte addizionali.
          Puoi decidere quale specifico oggetto esportare, nella maggior parte
          della situazioni, le impostazioni di default vanno più che bene.
        </p>
        <img src={infoExport} alt="" />
      </div>
      <form onSubmit={submitLogin} noValidate>
        <div className="mb-3">
          <label htmlFor="geometry" className="form-label">
            Modello
          </label>
          <input
            className="form-control"
            type="file"
            id="geometry"
            name="geometry"
            onChange={(ev) => updateImageField(ev)}
            value={formData.geometry}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nome modello
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={(ev) => updateInputValue(ev)}
            value={formData.name}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Descrizione
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={(ev) => updateInputValue(ev)}
            value={formData.description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="used_sw" className="form-label">
            Software Usato
          </label>
          <input
            type="text"
            className="form-control"
            id="used_sw"
            name="used_sw"
            onChange={(ev) => updateInputValue(ev)}
            value={formData.used_sw}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Data di creazione
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            onChange={(ev) => updateInputValue(ev)}
            value={formData.date}
          />
        </div>

        <button type="submit" className="btn btn-primary" onClick={submitLogin}>
          Aggiungi modello
        </button>
      </form>
    </>
  );
};
export default AddModel;
