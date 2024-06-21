import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { LOGIN } from "../redux/actions";

const Register = () => {
  const dispatch = useDispatch();

  //   const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    // profile_img: '',
  });

  const [errors, setErrors] = useState(null);

  const updateInputValue = (ev) => {
    setFormData((oldFormData) => ({
      ...oldFormData,
      [ev.target.name]: ev.target.value,
    }));
  };

  const updateImageField = (ev) => {
    updateInputValue(ev);
    // setProfileImage(ev.target.files[0]);
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
        // setErrors(!errors);
        console.log(err);
        alert("Password o indirizzo email non validi o non inseriti");
      });
  };

  return (
    // <form method="POST" action="....." novalidate enctype='multipart/form-data'> // se fatto in Blade
    <form onSubmit={(ev) => submitLogin(ev)} noValidate>
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
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          onChange={(ev) => updateInputValue(ev)}
          value={formData.email}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          onChange={(ev) => updateInputValue(ev)}
          value={formData.password}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password_confirmation" className="form-label">
          Conferma password
        </label>
        <input
          type="password"
          className="form-control"
          id="password_confirmation"
          name="password_confirmation"
          onChange={(ev) => updateInputValue(ev)}
          value={formData.password_confirmation}
        />
      </div>
      {/* <div className="mb-3">
                <label htmlFor="profile_img" className="form-label">
                    Profile image
                </label>
                <input
                    className="form-control"
                    type="file"
                    id="profile_img"
                    name="profile_img"
                    onChange={(ev) => updateImageField(ev)}
                    value={formData.profile_img}
                />
            </div> */}
      <button type="submit" className="btn btn-primary">
        Register
      </button>
    </form>
  );
};

export default Register;
