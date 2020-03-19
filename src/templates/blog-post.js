import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout/layout"
import styled from 'styled-components'
import { Link } from "gatsby";

const PostContainer = styled.div`
  margin-top: 1rem;
  color: #404040;
`;

const CategoriesContainer = styled.div`
  display: inline-block;
  background: #f2f2f2;
  border: 4px;
  font-size: .9rem;
  font-weight: 500;
  padding: .3rem .8rem;
  margin-bottom: 1.2rem;
`;

const DateContainer = styled.time`
  display: block;
  color: rgba(0,0,0,.6);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
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
  )
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
      }
    }
  }
`