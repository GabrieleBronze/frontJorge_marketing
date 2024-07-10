import React, { useState } from "react";
import { NavLink, Link } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoClose } from 'react-icons/io5';
import Dropdown from 'react-bootstrap/Dropdown';
import styles from './header.module.css';

export default function Header() {
  const [headerClicked, setHeaderClicked] = useState(false);

  const handleIconClick = () => {
    setHeaderClicked(!headerClicked);
  };

  return (
    <>
      <div className={${styles.icon} ${headerClicked ? styles.iconActive : ''}} onClick={handleIconClick}>
        {headerClicked ? <IoClose /> : <RxHamburgerMenu />}
      </div>
      <header className={headerClicked ? ${styles.header} ${styles.headerTransform} : styles.header}>
        <NavLink to="/" className={styles.navLink}>Home</NavLink>
        <Dropdown>
          <Dropdown.Toggle variant="dark" id="dropdown-basic" className={styles.dropdownToggle}>
            Marketing
          </Dropdown.Toggle>
          <Dropdown.Menu variant="dark" className={styles.dropdownMenu}>
            <Dropdown.Item as={Link} to="/pesquisa" className={styles.dropdownItem}>Pesquisa</Dropdown.Item>
            <Dropdown.Item as={Link} to="/campanha" className={styles.dropdownItem}>Campanha</Dropdown.Item>
            <Dropdown.Item as={Link} to="/evento" className={styles.dropdownItem}>Evento</Dropdown.Item>
            <Dropdown.Item as={Link} to="/qualidade" className={styles.dropdownItem}>Qualidade</Dropdown.Item>
            <Dropdown.Item as={Link} to="/indicadores" className={styles.dropdownItem}>Indicadores</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </header>
    </>
  );
}