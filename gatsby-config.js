const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'Agastya',
    description: 'I might talk about computation and programming.',
    author: 'Agastya Chandrakant',
    email: 'acagastya@outlook.com',
    twitter: '@acagastya',
    github: 'acagastya',
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
            resolve: `@raae/gatsby-remark-oembed`,
            options: {
              usePrefix: ['embed', 'video', 'oembed'],
              providers: {
                include: ['Twitter', 'Instagram'],
              },
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
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
            resolve: 'gatsby-remark-embed-spotify',
            options: {
              width: 320,
              height: 320,
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
              footnoteBackRefInnerText: '[return]',
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
  ],
};
