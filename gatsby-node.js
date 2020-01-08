const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve('src/templates/blogPost.js');
    resolve(
      graphql(
        `
          query {
            allMarkdownRemark(
              sort: { order: DESC, fields: [frontmatter___date] }
              filter: { frontmatter: { draft: { ne: true } } }
            ) {
              edges {
                node {
                  frontmatter {
                    path
                    title
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        const posts = result.data.allMarkdownRemark.edges;
        posts.forEach(({ node }, index) => {
          createPage({
            path: 'post' + node.frontmatter.path,
            component: blogPostTemplate,
            context: {
              pathSlug: node.frontmatter.path,
              prev: index == 0 ? null : posts[index - 1].node,
              next: index == posts.length - 1 ? null : posts[index + 1].node,
            },
          });
          resolve();
        });
      })
    );
  });
};
