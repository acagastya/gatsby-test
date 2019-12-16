import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link, useStaticQuery } from 'gatsby';

import Header from './header';
import Footer from './footer';

function Layout({ children }) {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          author
          description
          email
          github
          title
          twitter
        }
      }
    }
  `);
  const {
    author,
    description,
    email,
    github,
    title,
    twitter,
  } = data.site.siteMetadata;

  return (
    <div className="site">
      <Link to="#main" className="screen-reader">
        Skip to Content
      </Link>
      <Header siteTitle={title} description={description} />
      <main className="main" id="main">
        {children}
      </main>
      <Footer author={author} email={email} github={github} twitter={twitter} />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
