import React from "react";

const NavBar = ({ totalCounters }) => {
  console.log("NavBar - Rendered");

  return (
    <nav className="navbar navbar-light bg-light">
      <span className="navbar-brand mb-0 h1">Navbar</span>
      <span className="badge badge-pill badge-secondary">{totalCounters}</span>
    </nav>
  );
};

export default NavBar;
