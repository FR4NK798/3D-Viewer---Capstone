import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import infoExport from "../infoexpo.png";
import Spinner from "react-bootstrap/Spinner";

const AddModel = () => {
  const navigate = useNavigate();
  const [geometryfile, setGeometryfile] = useState(null);
  const [firstThen, setFirstThen] = useState(false);
  const [formData, setFormData] = useState({
    geometry: "",
    name: "",
    description: "",
    used_sw: "",
    date: "",
  });

  const updateInputValue = (ev) => {
    setFormData((oldFormData) => ({
      ...oldFormData,
      [ev.target.name]: ev.target.value,
    }));
  };

  const updateFileGeo = (ev) => {
    updateInputValue(ev);
    setGeometryfile(ev.target.files[0]);
  };

  const submitGeo = (ev) => {
    ev.preventDefault();
    axios
      .get("/sanctum/csrf-cookie")
      .then(() => {
        console.log("primo then");
        setFirstThen(true);

        if (firstThen === true) {
          console.log("firstThen", firstThen);
          let hide = document.getElementById("spin");
          let hide2 = document.getElementById("back");
          hide.classList.add("d-none");
          hide2.style.opacity = 1;
          // console.log("hide then true", hide2);
        } else {
          console.log("firstThen", firstThen);
          let hide = document.getElementById("spin");
          // let hide2 = document.getElementById("back");
          hide.classList.remove("d-none");
          // hide2[0].classList.remove("back2");
          // console.log("hide then false", hide2);
        }
        const body = new FormData();
        body.append("geometry", geometryfile); // TODO: verify this
        body.append("name", formData.name);
        body.append("description", formData.description);
        body.append("used_sw", formData.used_sw);
        body.append("date", formData.date);
        return axios.post("/api/upload-model", body, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      })
      .then((res) => {
        console.log("secondo then");
        setFirstThen(false);

        if (firstThen === true) {
          console.log("firstThen", firstThen);
          let hide = document.getElementById("spin");
          // let hide2 = document.getElementById("back");
          hide.classList.add("d-none");
          // hide2[0].classList.add("back2");
          // console.log("hide secondo then false", hide2);
        } else {
          console.log("firstThen", firstThen);
          let hide = document.getElementById("spin");
          let hide2 = document.getElementById("back");
          hide.classList.remove("d-none");
          hide2.style.opacity = 0.2;
          // console.log("hide secondo then false", hide2);
        }

        console.log("res", res);

        const myTimeout = setTimeout(() => {
          alert(
            "Modello inserito correttamente, verrai riportato nella Dashobard per visualizzarlo"
          );
          console.log("confermato e uscita");

          navigate("/");
        }, 1250);
      })
      .catch((err) => {
        console.log(err);
        alert("Compilare tutti i campi");
      });
  };

  let site = window.location.href;

  if (site.endsWith("addModel")) {
    let hide = document.getElementById("root");
    hide.classList.add("overflow-y-scroll");
  } else {
    let hide = document.getElementById("root");
    hide.classList.remove("overflow-y-scroll");
  }

  return (
    <>
      <div className="container mt-4 log" id="back">
        <Link to={`/`} className="logo">
          <h1>ThreeD Viewer</h1>
        </Link>
        <h2 className="mt-5 mb-4">Aggiungi nuovo modello 3D</h2>
        <div className="mb-3 text-start">
          <h1>Come importare modelli 3D in ThreeD Viewer</h1>
          <h2>Come esportare correttamente il modello da Blender</h2>
          <p>
            Per esportare il modello, abbiamo bisogno di generare un .glb file.
            Il sito si aspetterà per forza questo tipo di file per funzionare
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
            Questa schermata ti farà scegliere la cartella della destinazione
            dove salvare il file.
          </p>
          <p>
            Nella sezione di destra della finestra, ci sono scelte addizionali.
            Puoi decidere quale specifico oggetto esportare, nella maggior parte
            della situazioni, le impostazioni di default vanno più che bene.
          </p>
          <div>
            <img src={infoExport} alt="" className="w-100" />
          </div>
        </div>
        <form onSubmit={submitGeo} noValidate className="text-start">
          <div className="mb-3">
            <input
              type="file"
              id="geometry"
              name="geometry"
              className="custom-file-input"
              onChange={(ev) => updateFileGeo(ev)}
              value={formData.geometry}
              placeholder="File modello 3D"
            />
            <p>Dimensione massima 32 MB.</p>
          </div>
          <div className="mb-3">
            <input
              type="text"
              id="name"
              name="name"
              onChange={(ev) => updateInputValue(ev)}
              value={formData.name}
              placeholder="Nome modello"
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
              placeholder="Data di creazione"
            />
          </div>
          <div className="text-center">
            <button type="submit" className="mt-2 btLog" onClick={submitGeo}>
              Aggiungi modello
            </button>
          </div>
        </form>
      </div>
      <Spinner
        animation="border"
        variant="primary"
        className="d-none"
        id="spin"
      />
    </>
  );
};
export default AddModel;
