import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Icon from '../components/partials/Icon';
import {
  CalendarSVG,
  CategorySVG,
  EmailSVG,
  GitHubSVG,
  NextSVG,
  PrevSVG,
  TagSVG,
  TwitterSVG,
} from '../components/partials/SVGIcon';

import moment from 'moment';

function Template({ data, pageContext }) {
  const { next, prev } = pageContext;
  const { mdx } = data;
  const { body, frontmatter } = mdx;
  const { categories, date, excerpt, lang, path, tags, title } = frontmatter;
  const { email, username } = data.site.siteMetadata;
  const momentDate = moment(date);
  const parsedDate = momentDate.format('MMM DD, YYYY');
  const ISODate = momentDate.toISOString();
  return (
    <Layout showHeader={false} heading={title}>
      <SEO
        blog={true}
        description={excerpt}
        ISODate={ISODate}
        path={path}
        tags={tags}
        title={title}
      />
      <Article
        body={body}
        categories={categories}
        email={email}
        ISODate={ISODate}
        lang={lang}
        parsedDate={parsedDate}
        tags={tags}
        title={title}
        username={username}
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
        excerpt
        lang
        path
        tags
        title
      }
    }
    site {
      siteMetadata {
        email
        username
      }
    }
  }
`;

function Article({
  body,
  categories,
  email,
  ISODate,
  lang,
  parsedDate,
  tags,
  title,
  username,
}) {
  return (
    <article lang={lang} className="entry">
      <Header
        email={email}
        ISODate={ISODate}
        parsedDate={parsedDate}
        title={title}
        username={username}
      />
      <div className="entry-content">
        <MDXRenderer>{body}</MDXRenderer>
      </div>
      <Footer categories={categories} tags={tags} />
    </article>
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

function Header({ email, ISODate, parsedDate, title, username }) {
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
                  <Icon
                    link={`mailto:${email}`}
                    text="Contact via Email"
                    SVG={EmailSVG}
                  />
                </li>
                <li>
                  <Icon
                    link={`https://twitter.com/${username}`}
                    text="Open Twitter account in new tab"
                    SVG={TwitterSVG}
                  />
                </li>
                <li>
                  <Icon
                    link={`https://github.com/${username}`}
                    text="Open GitHub account in new tab"
                    SVG={GitHubSVG}
                  />
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

export default Template;
