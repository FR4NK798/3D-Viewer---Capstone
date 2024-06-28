import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LOGOUT } from "../redux/actions";

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

  return (
    <div class="infouser">
      {user ? (
        <>
          {user.role === "user" ? (
            <>
              <h1 className="menured">MENU DEL GIORNO</h1>
              <p>Piatto del giorno:</p>
              <Link className="btlog mt-2 mb-2 me-2" to="/dashboard">
                {user.name}
              </Link>
            </>
          ) : (
            <>
              <h1 className="menured">MENU DEL GIORNO</h1>
              <p>Piatto del giorno:</p>
              <span className="btlog mt-4 mb-2 me-2">{user.name}</span>
            </>
          )}

          <div className="btlog mt-4 mb-2 me-2" id="btout" onClick={logout}>
            Logout
          </div>
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
