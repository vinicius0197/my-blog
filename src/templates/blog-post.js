import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout/layout"
import styled from 'styled-components'

const PostContainer = styled.div`
  margin-top: 1rem;
`;

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <PostContainer>
        <h1>{post.frontmatter.title}</h1>
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
      }
    }
  }
`