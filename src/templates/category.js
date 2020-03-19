// This file handles blog posts categories and renders the category page

import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';

import Layout from '../components/layout/layout';
import PostsList from '../components/PostsList/';
import { PostsContainer } from '../styles/styles';

const CategoryTemplate = ({ location, pageContext, data }) => {
  const { category } = pageContext;
  return(
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Categories - Vinicius Costa</title>
        <link rel="canonical" href="https://vcsilva.com/" />
      </Helmet>
      <PostsContainer>
        <h1>Posts in Category <u>{ category }</u> </h1>
        <PostsList postEdges={data.allMarkdownRemark.edges} />
      </PostsContainer>
    </Layout>
  );
};

export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1000
      filter: { fields: { category: { eq: $category } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            category
          }
          excerpt
          timeToRead
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
        }
      }
    }
  }
`;

export default CategoryTemplate;
