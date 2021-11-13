import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";
import logo from "media/logo_DOD.png"
import "assets/navbar.css";

const Navbar = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <nav className="hidden lg:flex">
      <div className="hidden lg:flex navbar items-center justify-between w-5/6 m-auto py-5 px-0">
        <img src={logo} className="w-12 " />
        <NavLink
          exact
          activeClassName="navbar__link--active"
          className="exact navbar__link no-underline text-white hover:text-purple--900"
          to="/"
        >
          <i className="fa fa-home cursor-pointer" />
          HOME
        </NavLink>
        <button
          onClick={() => loginWithRedirect()}
          className="bg-white p-2 text-white shadow-md hover:bg-gray-200 rounded-lg"
        >
          Iniciar sesion
        </button>
      </div>
    </nav>
  );
};
export default Navbar