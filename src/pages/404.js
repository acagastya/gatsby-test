import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

function NotFoundPage() {
  return (
    <Layout>
      <SEO title="404: Not found" />
      <h1>Article not found. &nbsp;It is okay.</h1>
      <blockquote>
        <p>
          [The roads] moved with the land, you know? It rose, it fell, it
          curved.
          <br />
          Cars didn't drive on it to make great time.
          <br />
          They drove on it to have a great time.
        </p>
        <p>
          <cite>
            &mdash; Sally Carrera, <em>Cars (2006)</em>
          </cite>
        </p>
      </blockquote>
    </Layout>
  );
}

export default NotFoundPage;
