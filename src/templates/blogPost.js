import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import moment from 'moment';
require(`katex/dist/katex.min.css`);

function Template({ data, pageContext }) {
  const { next, prev } = pageContext;
  const { mdx } = data;
  const { body, frontmatter, html } = mdx;
  const { categories, date, lang, tags, title } = frontmatter;
  const { email, github, twitter } = data.site.siteMetadata;
  const momentDate = moment(date);
  const parsedDate = momentDate.format('MMM DD, YYYY');
  const ISODate = momentDate.toISOString();
  return (
    <Layout showHeader={false} heading={title}>
      <SEO title={title} />
      <Article
        body={body}
        categories={categories}
        email={email}
        github={github}
        html={html}
        ISODate={ISODate}
        lang={lang}
        parsedDate={parsedDate}
        tags={tags}
        title={title}
        twitter={twitter}
      />
      <EntryNavContainer next={next} prev={prev} />
    </Layout>
  );
}

export const query = graphql`
  query($pathSlug: String!) {
    mdx(frontmatter: { path: { eq: $pathSlug } }) {
      body
      frontmatter {
        categories
        date
        lang
        tags
        title
      }
    }
    site {
      siteMetadata {
        email
        github
        twitter
      }
    }
  }
`;

function Article({
  body,
  categories,
  email,
  github,
  html,
  ISODate,
  lang,
  parsedDate,
  tags,
  title,
  twitter,
}) {
  return (
    <article lang={lang} className="entry">
      <Header
        email={email}
        github={github}
        ISODate={ISODate}
        parsedDate={parsedDate}
        title={title}
        twitter={twitter}
      />
      {/* <div
        className="entry-content"
        dangerouslySetInnerHTML={{ __html: html }}
      /> */}
      <MDXRenderer>{body}</MDXRenderer>
      <Footer categories={categories} tags={tags} />
    </article>
  );
}

function CalendarSVG() {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  );
}

function CategorySVG() {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M22,19a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V5A2,2,0,0,1,4,3H9l2,3h9a2,2,0,0,1,2,2Z"></path>
    </svg>
  );
}

function Email({ email }) {
  return (
    <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">
      <span className="screen-reader">Contact via Email</span>
      <EmailSVG />
    </a>
  );
}

function EmailSVG() {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  );
}

function EntryNavContainer({ next, prev }) {
  return (
    <nav className="entry-nav-container">
      <div className="entry-nav">
        {prev && (
          <PrevEntry
            slug={prev.frontmatter.path}
            title={prev.frontmatter.title}
          />
        )}
        {next && (
          <NextEntry
            slug={next.frontmatter.path}
            title={next.frontmatter.title}
          />
        )}
      </div>
    </nav>
  );
}

function Footer({ categories, tags }) {
  return (
    <footer className="entry-footer-container">
      <div className="entry-footer">
        {categories.length ? (
          <div className="categories">
            <span className="taxonomyTerm-icon">
              <CategorySVG />
            </span>
            <span className="screen-reader">Categories: </span>
            {categories.map((category, index) => {
              return (
                <React.Fragment key={category}>
                  <Link className="category" to={`/categories/${category}`}>
                    {category}
                  </Link>
                  {index < categories.length - 1 ? ', ' : ' '}
                </React.Fragment>
              );
            })}
          </div>
        ) : null}
        {tags.length ? (
          <div className="tags">
            <span className="taxonomyTerm-icon">
              <TagSVG />
            </span>
            <span className="screen-reader">Tags: </span>
            {tags.map((tag, index) => {
              return (
                <React.Fragment key={tag}>
                  <Link className="tag" to={`/tags/${tag}`}>
                    {tag}
                  </Link>
                  {index < tags.length - 1 ? ', ' : ' '}
                </React.Fragment>
              );
            })}
          </div>
        ) : null}
      </div>
    </footer>
  );
}

function GitHub({ github }) {
  return (
    <a
      href={`https://github.com/${github}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="screen-reader">Open Github account in new tab</span>
      <GitHubSVG />
    </a>
  );
}

function GitHubSVG() {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  );
}

function Header({ email, github, ISODate, parsedDate, title, twitter }) {
  return (
    <header className="header-container">
      <div className="header entry-header">
        <div className="header-info">
          <h1 className="title">{title}</h1>
        </div>
        <div className="meta">
          <div className="social-menu-container">
            <nav aria-label="Social Menu">
              <ul className="social-menu">
                <li>
                  <Email email={email} />
                </li>
                <li>
                  <Twitter twitter={twitter} />
                </li>
                <li>
                  <GitHub github={github} />
                </li>
              </ul>
            </nav>
          </div>
          <PostedOn ISODate={ISODate} parsedDate={parsedDate} />
        </div>
      </div>
    </header>
  );
}

function NextEntry({ slug, title }) {
  return (
    <div className="next-entry">
      <Link to={`/post${slug}`}>
        <span className="screen-reader">Next post: </span>
        {title}
        <span aria-hidden="true">
          Next
          <NextSVG />
        </span>
      </Link>
    </div>
  );
}

function NextSVG() {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      aria-hidden="true"
    >
      <line x1="4" y1="12" x2="20" y2="12"></line>
      <polyline points="14 6 20 12 14 18"></polyline>
    </svg>
  );
}

function PostedOn({ ISODate, parsedDate }) {
  return (
    <span className="posted-on">
      <CalendarSVG />
      <span className="screen-reader">Posted on </span>
      <time className="date" dateTime={ISODate}>
        {parsedDate}
      </time>
    </span>
  );
}

function PrevEntry({ slug, title }) {
  return (
    <div className="prev-entry">
      <Link to={`/post${slug}`}>
        <span aria-hidden="true">
          <PrevSVG />
          Previous
        </span>
        <span className="screen-reader">Previous post: </span>
        {title}
      </Link>
    </div>
  );
}

function PrevSVG() {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      aria-hidden="true"
    >
      <line x1="20" y1="12" x2="4" y2="12"></line>
      <polyline points="10 18 4 12 10 6"></polyline>
    </svg>
  );
}

function TagSVG() {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M20.59,13.41l-7.17,7.17a2,2,0,0,1-2.83,0L2,12V2H12l8.59,8.59A2,2,0,0,1,20.59,13.41Z"></path>
      <line x1="7" y1="7" x2="7" y2="7"></line>
    </svg>
  );
}

function Twitter({ twitter }) {
  return (
    <a
      href={`https://twitter.com/${twitter}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="screen-reader">Open Twitter account in new tab</span>
      <TwitterSVG />
    </a>
  );
}

function TwitterSVG() {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
    </svg>
  );
}

export default Template;
