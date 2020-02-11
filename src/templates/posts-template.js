import React from "react"
import Layout from "../components/layout/layout"
import { Link, graphql } from "gatsby"
import styled from 'styled-components'

const SinglePost = styled.div`
  height: 2.5rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  border: 2px solid transparent;
  &:hover {
    border: 2px solid #f2f2f2;
    background: #f2f2f2;
  }
`;

const PostTitle = styled.div`
  display: flex;
  font-size: 1.2rem;
  line-height: 1rem;
  font-weight: 600;
  color: rgba(0,0,0,.6);
  ${SinglePost}:hover & {
    color: #111;
  }
`;

const PostDate = styled.div`
  padding: 0 0.5rem;
  color: #bbb;
`;

const PostsContainer = styled.div`
  margin-top: 1rem;
`;

class LastArticles extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
        <PostsContainer>
          <h2>All Posts</h2>

          <React.Fragment>
            {this.props.posts.allMarkdownRemark.edges.slice(0, 10).map(( {node} ) => (
              <Link
                to={node.fields.slug}
              >
                <SinglePost>
                  <PostTitle>
                    {node.frontmatter.title}{" "} - <PostDate>{node.frontmatter.date}</PostDate>
                  </PostTitle>
                </SinglePost>
              </Link>
            ))}
          </React.Fragment>
        </PostsContainer>
    )
  }
}

export default ({ data }) => {
  return (
    <Layout>
      <LastArticles
        posts={data}
      >
        teste
      </LastArticles>
    </Layout>
  )
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
`