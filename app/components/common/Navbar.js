import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => (
  <nav style={{ marginBottom: 0 }} className="navbar navbar-inverse">
    <div className="container-fluid">
      <Link className="btn btn-info btn-lg" id="logout" to="/" onClick={() => props.logout()}>
        <span className="glyphicon glyphicon-log-out" ></span> Log out
      </Link>
      <div className="navbar-header">
        <Link className="navbar-brand" to="/" onClick={() => this.props.pathName("/")}>transitMigo</Link>
      </div>
      <ul className="nav navbar-nav text-center">
        <li className={location.pathname === "/" && "active"}>
          <Link to="/" onClick={() => this.props.pathName("/")}>Home</Link>
        </li>
        <li className={location.pathname === "/saves" && "active"}>
          <Link to="/saves" onClick={() => this.props.pathName("/saves")}>Saves</Link>
        </li>
        <li className={location.pathname === "/favorites" && "active"}>
          <Link to="/favorites" onClick={() => this.props.pathName("/favorites")}>Favorites</Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
