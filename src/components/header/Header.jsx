import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import styles from './header.module.css';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoClose } from 'react-icons/io5';
import { Link } from "react-router-dom";

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function Header() {
  const [headerClicked, setHeaderClicked] = useState(false);

  const handleIconClick = () => {
    setHeaderClicked(!headerClicked);
  };

  return (
    <>

      <div className={`${styles.icon} ${headerClicked ? styles.iconActive : ''}`} onClick={handleIconClick}>
        {headerClicked ? <IoClose /> : <RxHamburgerMenu />}
      </div>
      <header className={headerClicked ? `${styles.header} ${styles.headerTransform}` : styles.header}>
        <NavLink to="/"> Home</NavLink>
        
        <Dropdown>
          <Dropdown.Toggle variant="dark" id="dropdown-basic">
            Marketing
          </Dropdown.Toggle>
          <Dropdown.Menu variant="dark" title="Marketing">
            <Dropdown.Item as={Link} to={`/pesquisa`}>  Pesquisa </Dropdown.Item>
            <Dropdown.Item as={Link} to={`/campanha`}>  Campanha </Dropdown.Item>
            <Dropdown.Item as={Link} to={`/evento`}>  Evento </Dropdown.Item>
            <Dropdown.Item as={Link} to={`/qualidade`}>  Qualidade </Dropdown.Item>
            <Dropdown.Item as={Link} to={`/indicadores`}>  Indicadores </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>



      </header>
    </>
  );
}
