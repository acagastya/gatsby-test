import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import moment from 'moment';

function IndexPage({ data }) {
  const { edges } = data.allMarkdownRemark;
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
              <ul className="list">
                {edges.map(edge => {
                  const { date, path, title } = edge.node.frontmatter;
                  const parsedDate = moment(date).format('YYYY, MMM DD');
                  return (
                    <li className="list-item">
                      <article>
                        <div className="meta">
                          <span>
                            <span className="screen-reader">Posted on </span>
                            <time datetime="2019-10-28T00:00:00Z">
                              {parsedDate}
                            </time>
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
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
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
