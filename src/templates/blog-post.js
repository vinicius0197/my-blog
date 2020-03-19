// This file renders a single blog post.

import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

import Layout from '../components/layout/layout';
import { Link } from 'gatsby';

import {
  PostContainer,
  CategoriesContainer,
  DateContainer
} from './styles';

export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{post.frontmatter.title}</title>
        <link rel="canonical" href={`https://vcsilva.com/${post.fields.slug}`} />
      </Helmet>
      <PostContainer>
        <h1 style={{ marginBottom: '0.5rem' }}>{post.frontmatter.title}</h1>
        <DateContainer>
          { post.frontmatter.date }
        </DateContainer>
        <CategoriesContainer>
          <Link to={`/category/${post.fields.category}`}>
            {post.fields.category}
          </Link>
        </CategoriesContainer>

        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </PostContainer>
    </Layout>
  );
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "DD MMMM, YYYY")
      }
      fields {
        category
        slug
      }
    }
  }
`;