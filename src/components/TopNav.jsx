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
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">ThreeD Viewer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link> */}
          </Nav>
        </Navbar.Collapse>

        {/* <li className="nav-item">
          <Link className="nav-link active" to="/transcript">
            Transcript
          </Link>
        </li> */}

        {user ? (
          <>
            {user.role === "user" ? (
              <Link className="nav-link active" to="/dashboard">
                <span className="me-2">{user.name}</span>
              </Link>
            ) : (
              <span className="me-2">{user.name}</span>
            )}
            {/* <Link className="nav-link active" to="/faculty">
              <span className="me-2">{user.name}</span>
            </Link> */}
            {/* <img
              className="me-2"
              src={user.profile_img}
              alt=""
              style={{ height: "50px", width: "50px" }}
            /> */}
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
