import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LOGOUT } from "../redux/actions";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const TopNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const logout = () => {
    axios
      .post("/logout")
      .then(() => dispatch({ type: LOGOUT }))
      .then(() => navigate("/"));
  };
  // console.log("user nav", user);

  return (
    <div class="infouser">
      {user ? (
        <>
          {user.role === "user" ? (
            <>
              <h1 className="menured">MENU DEL GIORNO</h1>
              <p>Piatto del giorno:</p>
              <Link className="nav-link active btlog" to="/dashboard">
                <span className="me-2 mt-2 mb-2 text-white">{user.name}</span>
              </Link>
            </>
          ) : (
            <span className="me-2 mt-2 mb-2 text-white">{user.name}</span>
          )}

          <button className="btlog mt-2 mb-2 me-2" onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <h1 className="menured">MENU DEL GIORNO</h1>
          <p>Il menu oggi offre:</p>
          <Link className="btlog mt-2 mb-2 me-2" to="/login">
            Login
          </Link>
          <Link className="btlog mt-2 mb-2 me-2" to="/register">
            Registrati
          </Link>
        </>
      )}
    </div>
  );
};

export default TopNav;
