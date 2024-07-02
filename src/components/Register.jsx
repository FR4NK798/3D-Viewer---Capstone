import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { LOGIN } from "../redux/actions";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const Register = () => {
  const dispatch = useDispatch();
  const [firstThen, setFirstThen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const updateInputValue = (ev) => {
    setFormData((oldFormData) => ({
      ...oldFormData,
      [ev.target.name]: ev.target.value,
    }));
  };

  const submitLogin = (ev) => {
    ev.preventDefault();
    // gli indirizzi relativi, con il proxy attivo fanno la richiesta a http://localhost:8000/login mascherandolo come indirizzo nello stesso host di react (che nel nostro caso è http://localhost:3000/login)
    axios
      .get("/sanctum/csrf-cookie")
      .then(() => {
        const body = new FormData();
        body.append("name", formData.name);
        body.append("email", formData.email);
        body.append("password", formData.password);
        body.append("password_confirmation", formData.password_confirmation);
        // body.append('profile_img', profileImage); // TODO: verify this
        return axios.post("/register", body);
      })
      .then(() => axios.get("/api/user"))
      .then((res) => {
        // salvare i dati dello user nel Redux state
        dispatch({
          type: LOGIN,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        // alert(err.response.data.errors.mail);
        // setErrors(err.response.data.errors);
      });
  };

  return (
    <>
      <div className="container mt-4 log" id="back">
        <Link to={`/`} className="logo">
          <h1>ThreeD Viewer</h1>
        </Link>
        <h2 className="mt-5 mb-4">Registrati</h2>
        <form onSubmit={(ev) => submitLogin(ev)} noValidate>
          <div className="mb-3">
            <input
              type="text"
              id="name"
              name="name"
              onChange={(ev) => updateInputValue(ev)}
              value={formData.name}
              placeholder="Nome"
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              id="email"
              name="email"
              onChange={(ev) => updateInputValue(ev)}
              value={formData.email}
              placeholder="Email"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              id="password"
              name="password"
              onChange={(ev) => updateInputValue(ev)}
              value={formData.password}
              placeholder="Password"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              onChange={(ev) => updateInputValue(ev)}
              value={formData.password_confirmation}
              placeholder="Conferma password"
            />
          </div>

          <button type="submit" className="mt-2 btLog">
            Registrati
          </button>
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

export default Register;
