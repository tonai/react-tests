import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../logo.svg';

import './Header.css';

function Header() {
  return (
    <div className="Header" >
      <ul className="Header__list" >
        <li className="Header__item" >
          <Link className="Header__link" to="/" >
            <img alt="Logo" className="Header__image" src={logo} />
            <span>Home</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default memo(Header);
