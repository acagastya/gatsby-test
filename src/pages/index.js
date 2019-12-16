import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

function IndexPage() {
  return (
    <Layout>
      <SEO title="Home" />
      <div className="home-sections-container">
        <div className="home-sections">
          <section id="recent-posts" className="home-section">
            <header>
              <h2 class="home-section-title title">Blog Posts</h2>
            </header>
            <div className="list-container">
              <ul className="list"></ul>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

export default IndexPage;
