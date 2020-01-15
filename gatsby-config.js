const path = require('path');

module.exports = {
  siteMetadata: {
    author: 'Agastya Chandrakant',
    description: 'I might talk about computation and programming.',
    email: 'acagastya@outlook.com',
    github: 'acagastya',
    instagram: 'acagastya',
    siteName: 'Forever learning (with) Agastya',
    siteUrl: 'https://acagastya.org',
    title: 'Agastya',
    twitter: '@acagastya',
    username: 'acagastya',
  },
  plugins: [
    'gatsby-plugin-twitter',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: path.join(__dirname, 'src', 'posts'),
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              className: 'autolink-header-anchor',
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
          },
          {
            resolve: 'gatsby-remark-embedder',
          },
          {
            resolve: 'gatsby-remark-mermaid',
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: '›',
              noInlineHighlight: false,
              showLineNumbers: false,
              prompt: {
                user: 'john',
                host: 'doe',
                global: false,
              },
            },
          },
          {
            resolve: 'gatsby-remark-katex',
            options: {
              strict: 'ignore',
            },
          },
        ],
        remarkPlugins: [
          {
            resolve: 'gatsby-remark-footnotes',
            options: {
              footnoteBackRefAnchorStyle: 'text-decoration: line-through;',
              footnoteBackRefDisplay: 'inline',
              footnoteBackRefInnerText: '^',
              footnoteBackRefPreviousElementDisplay: 'inline',
              useFootnoteMarkerText: false,
            },
          },
          require('remark-abbr'),
        ],
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'src', 'images'),
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Agastya',
        short_name: `Agastya's place to explain`,
        start_url: '/',
        background_color: '#324996',
        theme_color: '#298BCC',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },

    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          getBlogFeed({
            filePathRegex: `//src/posts//`,
            blogUrl: 'https://acagastya.org/post/',
            output: '/post/rss.xml',
            title: 'Blog RSS Feed',
            siteUrl: 'https://acagastya.org/post',
          }),
        ],
      },
    },
  ],
};

function getBlogFeed({ filePathRegex, blogUrl, siteUrl, ...overrides }) {
  return {
    serialize: ({ query: { allMdx } }) => {
      const stripSlash = slug => (slug.startsWith('/') ? slug.slice(1) : slug);
      return allMdx.edges.map(edge => {
        const url = `${siteUrl}/${stripSlash(edge.node.frontmatter.path)}`;
        const html = (edge.node.html || ``)
          .replace(/href="\//g, `href="${siteUrl}/`)
          .replace(/src="\//g, `src="${siteUrl}/`)
          .replace(/"\/static\//g, `"${siteUrl}/static/`)
          .replace(/,\s*\/static\//g, `,${siteUrl}/static/`);

        return {
          ...edge.node.frontmatter,
          description: edge.node.excerpt,
          date: edge.node.frontmatter.date,
          url,
          guid: url,
          custom_elements: [
            {
              'content:encoded': `<div style="width: 100%; margin: 0 auto; max-width: 800px; padding: 40px 40px;">
                ${html}
              </div>`,
            },
          ],
        };
      });
    },
    query: `
     {
       site {
         siteMetadata {
           title
           description
         }
       }
       allMdx(
         limit: 1000,
         filter: {
           frontmatter: {draft: {ne: true}}
           fileAbsolutePath: {regex: "${filePathRegex}"}
         }
         sort: { order: DESC, fields: [frontmatter___date] }
       ) {
         edges {
           node {
             excerpt(pruneLength: 250)
             html
             frontmatter {
               date
               path
               title
             }
           }
         }
       }
     }
   `,
    ...overrides,
  };
}
