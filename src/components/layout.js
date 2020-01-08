import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';

import Header from './header';
import Footer from './footer';

function Layout({
  children,
  heading = undefined,
  showHeader = true,
  slug = undefined,
}) {
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
      <a href="#main" className="screen-reader">
        Skip to Content
      </a>
      <Header
        description={description}
        showHeader={showHeader}
        siteTitle={heading || title}
        slug={slug}
      />
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
