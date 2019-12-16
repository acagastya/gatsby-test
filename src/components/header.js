import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

function Header({ description, siteTitle }) {
  return (
    <header id="header" className="header-container">
      <div className="header site-header">
        <nav
          id="main-menu"
          className="main-menu-container"
          aria-label="Main Menu"
        >
          <ul className="main-menu">
            <li>
              <Link to="/post">Blog</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        <div className="header-info">
          <p className="site-title title">
            <Link to="/">{siteTitle}</Link>
          </p>

          <p className="site-description subtitle">{description}</p>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
