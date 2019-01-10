import React from "react";
import { Link } from "react-router-dom";

function ClassNav(props) {
  return (
    <ul className={props.className}>
      <li>
        <Link to="/class/duelist">Duelist</Link>
      </li>
      <li>
        <Link to="/class/marauder">Marauder</Link>
      </li>
      <li>
        <Link to="/class/ranger">Ranger</Link>
      </li>
      <li>
        <Link to="/class/scion">Scion</Link>
      </li>
      <li>
        <Link to="/class/shadow">Shadow</Link>
      </li>
      <li>
        <Link to="/class/templar">Templar</Link>
      </li>
      <li>
        <Link to="/class/witch">Witch</Link>
      </li>
    </ul>
  );
}

export default ClassNav;
