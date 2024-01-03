import React from 'react';
import { NavLink } from 'react-router-dom';
import MainMenu from '../global/mainMenu';

function NavItemsList({ menuLinks }) {
  return (
    <MainMenu
      menuItems={
        <>
          {menuLinks.map((link) => (
            <li key={link.name} className='hover:text-white duration-150'>
              <NavLink to={link.path}>{link.name}</NavLink>
            </li>
          ))}
        </>
      }
    />
  );
}

export default NavItemsList;
