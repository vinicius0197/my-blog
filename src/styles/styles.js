import styled from 'styled-components'

export const Title = styled.h1`
  font-size: 2.1em;
  text-align: left;
  margin-left: 1em;

  @media (max-width: 950px) {
    margin: 0.2em;
    text-align: center;
  }
`;

export const SinglePost = styled.div`
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

export const PostTitle = styled.div`
  display: flex;
  font-size: 1.2rem;
  line-height: 1rem;
  font-weight: 600;
  color: rgba(0,0,0,.6);
  ${SinglePost}:hover & {
    color: #111;
  }
`;

export const PostDate = styled.div`
  padding: 0 0.5rem;
  color: #bbb;

  @media (max-width: 950px) {
    display: none;
  }
`;

export const PostsContainer = styled.div`
  margin-top: 1rem;
`;
