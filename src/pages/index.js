import React from 'react';
import { Link, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

import Layout from '../components/layout/layout';
import Wrapper from '../components/cover/cover';
import MailCard from '../components/MailCard';

import {
  SinglePost,
  PostTitle,
  PostDate,
  PostsContainer,
  About,
  Title
} from '../styles/styles';

const MAXIMUM_POSTS = 5;

class LastArticles extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
        <PostsContainer>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Vinicius Costa</title>
            <link rel="canonical" href="https://vcsilva.com/" />
          </Helmet>
          <h2>Recents Posts</h2>

          <div>
            {this.props.posts.allMarkdownRemark.edges.slice(0, MAXIMUM_POSTS).map(( {node} ) => (
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
          </div>
        </PostsContainer>
    );
  }
}

export default ({ data }) => {
  return(
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Vinicius Costa</title>
        <link rel="canonical" href="https://vcsilva.com/" />
      </Helmet>
      <Wrapper>
        <Title>Hi, I'm Vinicius</Title>
        <About>
          I'm a software developer based in Brasilia, Brasil. You can find me at <a href="https://github.com/vinicius0197">Github</a> and check
          my thoughts here at this blog.
        </About> 
      </Wrapper>

      <MailCard />

      <LastArticles
        posts={data}
      >
      </LastArticles>
    </Layout>
  );
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
`;