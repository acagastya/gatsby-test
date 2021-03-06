import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import moment from 'moment';

function IndexPage({ data }) {
  const { edges } = data.allMdx;
  return (
    <Layout>
      <SEO title="Home" />
      <div className="home-sections-container">
        <div className="home-sections">
          <section id="recent-posts" className="home-section">
            <header>
              <h2 className="home-section-title title">Blog Posts</h2>
            </header>
            <div className="list-container">
              <ul className="list">
                {edges.map(edge => {
                  const { date, path, title } = edge.node.frontmatter;
                  const momentDate = moment(date);
                  const parsedDate = momentDate.format('MMM DD, YYYY');
                  const ISODate = momentDate.toISOString();
                  return (
                    <li className="list-item" key={path}>
                      <article>
                        <div className="meta">
                          <span>
                            <span className="screen-reader">Posted on </span>
                            <time dateTime={ISODate}>{parsedDate}</time>
                          </span>
                        </div>
                        <header className="list-item-header">
                          <h3 className="list-item-title">
                            <Link to={'/post/' + path}>{title}</Link>
                          </h3>
                        </header>
                      </article>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query HomePageQuery {
    allMdx(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { draft: { ne: true } } }
    ) {
      edges {
        node {
          frontmatter {
            date
            path
            title
          }
        }
      }
    }
  }
`;

export default IndexPage;
