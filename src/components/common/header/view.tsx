import React, { ReactElement } from 'react';

import catalogIcon from '@/assets/images/menu/catalog.svg';
import processLogo from '@/assets/images/menu/processes.svg';
import incidentsLogo from '@/assets/images/menu/incidents.svg';
import { NavLink } from '@/components/common';
import './styles.scss';

function Header(): ReactElement {

  const linksList = [
    { name: "Data Catalog", value: ``, icon: catalogIcon },
    { name: "Processes", value: '/processes', icon: processLogo },
    { name: "Incidents", value: ``, icon: incidentsLogo },
  ];

  return (
    <header className="header">
      <NavLink to="/" className='logo-link' shouldUseActiveStyles={false}>
        <span className='logo-name'>RecoLabs</span>
      </NavLink>
      <nav className="menu-wrapper">
        {linksList.map((link) => (
          <NavLink className="menu-item" key={link.name} to={link.value} activeClassName="active">
            <div className='menu-item_inner'>
              <div className="link-icon">
                <img src={link.icon} alt={link.name} />
              </div>
              <div className="link-name">{link.name}</div>
            </div>
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default Header;
