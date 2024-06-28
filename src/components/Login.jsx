import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { LOGIN } from "../redux/actions";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState(true);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const updateInputValue = (ev) => {
    setFormData((oldFormData) => ({
      ...oldFormData,
      [ev.target.name]: ev.target.value,
    }));
  };

  const submitLogin = (ev) => {
    ev.preventDefault();
    axios
      .get("/sanctum/csrf-cookie")
      .then(() => axios.post("/login", formData))
      .then(() => axios.get("/api/user"))
      .then((res) => {
        dispatch({
          type: LOGIN,
          payload: res.data,
        });
      })
      .catch((err) => {
        setErrors(!errors);
        console.log(err);
        alert("Password o indirizzo email non validi");
      });
  };

  return (
    <div className="container mt-4 log">
      <Link to={`/`} className="logo">
        <h1>ThreeD Viewer</h1>
      </Link>
      <h2 className="mt-5 mb-4">Accedi</h2>
      <form onSubmit={(ev) => submitLogin(ev)} noValidate>
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
        <button type="submit" className="mt-2 btLog">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
