import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

function NotFoundPage() {
  return (
    <Layout heading="404: Not found.  Ok">
      <SEO title="404: Not found" />
      <article class="entry" lang="en">
        <div className="entry-content">
          <h1>It is okay, it is all right.</h1>
          <CodeBlock />
          <Quote />
        </div>
      </article>
    </Layout>
  );
}

function CodeBlock() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.toLocaleString('en', { month: 'short' });
  const day = date.getDate();
  const parsedDate = `${day}-${month}-${year}`;
  return (
    <div className="gatsby-highlight" data-language="mbasic">
      <pre className="language-mbasic">
        <code className="language-mbasic">
          <div>
            BASIC<span className="token operator">-</span>
            <span className="token number">80</span> Rev.{' '}
            <span className="token number">5.21</span>
          </div>
          <div>
            [CP<span className="token operator">/</span>M Version] Copyright{' '}
            <span className="token number">2019</span>
            <span className="token operator">-</span>
            <span className="token number">{year}</span>{' '}
            <span className="token punctuation">(</span>C
            <span className="token punctuation">)</span> by Agastya
          </div>
          <div>
            Created
            <span className="token punctuation">:</span>{' '}
            <span className="token number">{parsedDate}</span>
          </div>
          <div>
            <span className="token number">298</span> bytes free
          </div>
          <div>Ok</div>
          <div>
            <span className="token number">10</span>{' '}
            <span className="token function">PRINT</span>{' '}
            <span className="token string">"Page not found."</span>
          </div>
          <div>
            <span className="token keyword">run</span>
          </div>
          <div>Page not found.</div>
          <div>Ok</div>
        </code>
      </pre>
    </div>
  );
}

function Quote() {
  return (
    <blockquote>
      <p>
        [The roads] moved with the land, you know? It rose, it fell, it curved.
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
  );
}

export default NotFoundPage;
