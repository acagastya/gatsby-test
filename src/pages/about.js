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
            Hi, I’m Agastya. I go by the name <em>acagastya</em> across the
            internet.
          </p>
          <p>
            I’m an undergrad student, and I aim to write about various
            mathematical and computational topics here. But I would also be
            writing about learning, even if it is not primarily focused on these
            two topics.
          </p>
          <p>
            If a situation were to arise where you wish to write to me, links to
            some of my internet accounts are mentioned below. Mention me in a
            tweet, write an email, or see my pictures on Instagram!
          </p>
        </div>
      </article>
    </Layout>
  );
}

export default About;
