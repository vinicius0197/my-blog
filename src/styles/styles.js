// Keep specific stylings here
import styled from 'styled-components';
import myAvatar from '../assets/avatar.jpeg';

// Layout
export const BaseLayout = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 50%;
  margin: 0 auto;

  @media (max-width: 850px) {
    width: 90%;
  }

  @media (max-width: 450px) {
    width: 95%;
  }
`;

export const TitleBar = styled.h3`
  padding: 0.2rem;
  cursor: pointer;
  color: #333;
  &:hover {
    color: #111;
  }
`;

export const NavContainer = styled.nav`
  display: block;
  padding-top: 1rem;

  @media (max-width: 950px) {
    margin-bottom: 1em;
  }

  @media (max-width: 450px) {
    padding-top: 0.4rem;
  }
`;

export const Navbar = styled.nav`
  padding-top: 0.5rem;
  height: 3rem;
  padding-top: 0.4rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const LinkList = styled.ul`
  list-style-type: none;
  display: flex;
  margin-top: 0px;
  flex-direction: row;

  @media (max-width: 450px) {
    justify-content: left;
  }
`;

export const Item = styled.li`
  padding: 0 0.9rem;
  cursor: pointer;
  color: rgba(0,0,0,.45);
  &:hover {
    color: #111;
  }

  @media (max-width: 450px) {
    padding: 0 0.4rem;
  }

  @media (max-width: 350px) {
    padding: 0 0.2rem;
  }
`;

export const Footer = styled.footer`
  font-size: 0.9rem;
  display: flex;
`;

// Cover

export const Wrapper = styled.section`
  display: flex;
  padding: 2em;
  background: #f0f0f0;
  border-radius: 0.5em;
  margin-top: 1em;
  justify-content: center;
  width: 100%;
  @media (max-width: 1085px) {
    flex-direction: column;
    align-items: center;
    width: 25rem;
  }

  @media (max-width: 950px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 0.5em;
  }

  @media (max-width: 500px) {
    
  }

`;

export const About = styled.div`
  font-size: 1.2em;
  margin-left: 1.8em;
`;

export const Avatar = styled.div`
  background-image: url(${myAvatar});
  height: 120px;
  width: 120px;
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
  border-radius: 50%;
`;



// Posts
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

// About Page
export const AboutTitle = styled.h2`
  color: #111;
`;

export const AboutContainer = styled.div`
  margin-top: 2rem;
`;

export const AboutBody = styled.div`
  display: block;
  color: #404040;
`;