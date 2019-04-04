import React from 'react';
import { Link } from 'react-router-dom';

function SideMenu() {
  return (
    <section className="side-menu">
      <Link to='/airports' className="link-to">Airports</Link>
    </section>
  );
}

export default SideMenu;
