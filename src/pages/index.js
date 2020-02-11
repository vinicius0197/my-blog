import React from "react"
import { Link, graphql } from "gatsby"
import styled from 'styled-components'
import Layout from "../components/layout/layout"
import { Title } from "../styles/styles"
import Wrapper from "../components/cover/cover"
import { About } from "../components/cover/styles"

const MAXIMUM_POSTS = 5

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
          <h2>Recents Posts</h2>

          <div>
            {this.props.posts.allMarkdownRemark.edges.slice(0, MAXIMUM_POSTS).map(( {node} ) => (
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
          </div>
        </PostsContainer>
    )
  }
}

export default ({ data }) => {
  return(
    <Layout>
      <Wrapper>
        <Title>Hi, I'm Vinicius</Title>
        <About>
          I'm a software developer based in Brasilia, Brasil. You can find me at <a href="https://github.com/vinicius0197">Github</a> and check
          my thoughts here at this blog.
        </About> 
      </Wrapper>

      <LastArticles
        posts={data}
      >
        teste
      </LastArticles>
    </Layout>
  )
}

export const query = graphql`
{
  allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
    totalCount
    edges {
      node {
        frontmatter {
          title
          date(formatString: "DD MMMM, YYYY")
        }
        fields {
          slug
        }
        excerpt
      }
    }
  }
}
`