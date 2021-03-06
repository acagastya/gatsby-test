import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';

import moment from 'moment';

function SingleTagTemplate({ pageContext }) {
  const { posts, tag } = pageContext;
  return (
    <Layout heading={`Tag: ${tag}`} link="/tags" slug="tag">
      <SEO title={`Tag: ${tag}`} />
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

export default SingleTagTemplate;
