import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';

import moment from 'moment';

function SingleCatTemplate({ pageContext }) {
  const { posts, cat } = pageContext;
  return (
    <Layout heading={`Category: ${cat}`} link="/categories" slug="category">
      <SEO title={`Category: ${cat}`} />
      <div className="list-container">
        <ul className="list">
          {posts.map(post => {
            const { date, path, title } = post.frontmatter;
            const momentDate = moment(date);
            const parsedDate = momentDate.format('MMM DD, YYYY');
            const ISODate = momentDate.toISOString();
            return (
              <li key={path} className="list-item">
                <article>
                  <div className="meta">
                    <span>
                      <span className="screen-reader">Posted on </span>
                      <time dateTime={ISODate}>{parsedDate}</time>
                    </span>
                  </div>
                  <header className="list-item-header">
                    <h3 className="list-item-title">
                      <Link to={`/post/${path}`}>{title}</Link>
                    </h3>
                  </header>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
}

export default SingleCatTemplate;
