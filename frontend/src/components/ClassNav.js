import React from "react";
import { NavLink } from "react-router-dom";

function ClassNav({ className }) {
  return (
    <ul className={className}>
      <li>
        <NavLink to="/class/duelist">Duelist</NavLink>
      </li>
      <li>
        <NavLink to="/class/marauder">Marauder</NavLink>
      </li>
      <li>
        <NavLink to="/class/ranger">Ranger</NavLink>
      </li>
      <li>
        <NavLink to="/class/scion">Scion</NavLink>
      </li>
      <li>
        <NavLink to="/class/shadow">Shadow</NavLink>
      </li>
      <li>
        <NavLink to="/class/templar">Templar</NavLink>
      </li>
      <li>
        <NavLink to="/class/witch">Witch</NavLink>
      </li>
    </ul>
  );
}

export default React.memo(ClassNav);
