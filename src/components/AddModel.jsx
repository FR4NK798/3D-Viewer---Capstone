import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

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
        const myTimeout = setTimeout(() => {
          console.log("confermato e uscita");
          navigate("/");
        }, 5000);

        // salvare i dati dello user nel Redux state
      });
    // .catch((err) => {
    //     console.log(err.response.data.errors);
    //     setErrors(err.response.data.errors);
    // });
  };

  return (
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
          Name
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
          Data
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

      {/* <Form.Group className="mb-3">
        <Form.Label>Ruolo</Form.Label>
        <Form.Select
          aria-label="Default select example"
          onChange={(ev) => updateInputValue(ev)}
          value={formData.role}
        >
          <option value="owner">Proprietario</option>
          <option value="collaborator">Collaboratore</option>
        </Form.Select>
      </Form.Group> */}

      <button type="submit" className="btn btn-primary" onClick={submitLogin}>
        Aggiungi modello
      </button>
    </form>
  );
};
export default AddModel;
