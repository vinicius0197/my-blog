// This file renders the 'all posts' page
import React from 'react';
import { Helmet } from 'react-helmet';

import Layout from '../components/layout/layout';
import { Link, graphql } from 'gatsby';
import {
  SinglePost,
  PostTitle,
  PostDate,
  PostsContainer
} from '../styles/styles';

class LastArticles extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <PostsContainer>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Posts - Vinicius Costa</title>
          <link rel="canonical" href="https://vcsilva.com/" />
        </Helmet>
        <h2>All Posts</h2>

        <React.Fragment>
          {this.props.posts.allMarkdownRemark.edges.slice(0, 10).map(({ node }) => (
            <Link
              to={node.fields.slug}
            >
              <SinglePost>
                <PostTitle>
                  {node.frontmatter.title}{" "} <PostDate> - {node.frontmatter.date}</PostDate>
                </PostTitle>
              </SinglePost>
            </Link>
          ))}
        </React.Fragment>
      </PostsContainer>
    );
  };
}

export default ({ data }) => {
  return (
    <Layout>
      <LastArticles
        posts={data}
      >
      </LastArticles>
    </Layout>
  );
}

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
        }
      }
    }
  }
`;