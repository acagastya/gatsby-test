import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';

function About() {
  return (
    <Layout heading="About" slug="about">
      <SEO title="About" />
      <article class="entry" lang="en">
        <div className="entry-content">
          <p>
            Hi, I’m Agastya. Netizens know me as <em>acagastya</em>.
          </p>
          <p>
            I am an undergrad student, and I aim to write about various
            mathematical and computational topics here.
          </p>
        </div>
      </article>
    </Layout>
  );
}

export default About;
