import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {sessionUser && (
        <>
          <li>
            <NavLink to="/spots/new">Create a New Spot</NavLink>
          </li>
          <li>
            <NavLink to="/spots/manage">Manage Spots</NavLink>
          </li>
        </>
      )}
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
