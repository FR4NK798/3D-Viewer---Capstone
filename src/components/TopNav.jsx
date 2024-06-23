import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LOGOUT } from "../redux/actions";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

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

  console.log("user nav", user);

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">ThreeD Viewer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto"></Nav>
        </Navbar.Collapse>

        {user ? (
          <>
            {user.role === "user" ? (
              <Link className="nav-link active" to="/dashboard">
                <span className="me-2 text-white">{user.name}</span>
              </Link>
            ) : (
              <span className="me-2 text-white">{user.name}</span>
            )}

            <button className="btn btn-primary" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="btn btn-primary me-2" to="/login">
              Login
            </Link>
            <Link className="btn btn-primary" to="/register">
              Register
            </Link>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default TopNav;
