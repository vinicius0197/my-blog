import styled from 'styled-components'
import myAvatar from '../../assets/avatar.jpeg'

export const Wrapper = styled.section`
  display: flex;
  padding: 2em;
  background: #f0f0f0;
  border-radius: 0.5em;
  margin-top: 1em;
  justify-content: center;
`;

export const About = styled.div`
  font-size: 1.2em;
  margin-left: 1.8em;
`;

export const Avatar = styled.div`
  background-image: url(${myAvatar});
  height: 6rem;
  width: 6rem;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
`;

