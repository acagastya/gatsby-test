import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/layout';

function AllTagsTemplate({ data, pageContext }) {
  const { postsByTag, tags } = pageContext;
  const totalLength = Object.keys(postsByTag).reduce(
    (acc, cur) => acc + postsByTag[cur].length,
    0
  );
  return (
    <Layout heading="Tags" slug="tags">
      <div className="term-cloud-container">
        <ul className="term-cloud">
          {tags.map(tag => {
            const num = 1.8 * (postsByTag[tag].length / totalLength);
            return (
              <li key={tag}>
                <Link to={`/tags/${tag}`} style={{ fontSize: `${1 + num}em` }}>
                  {tag}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
}

export default AllTagsTemplate;
