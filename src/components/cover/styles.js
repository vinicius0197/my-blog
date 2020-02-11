import styled from 'styled-components'
import myAvatar from '../../assets/avatar.jpeg'

export const Wrapper = styled.section`
  display: flex;
  padding: 2em;
  background: #f0f0f0;
  border-radius: 0.5em;
  margin-top: 1em;
  justify-content: center;
  width: 50rem;
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
  height: 150px;
  width: 150px;
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
  border-radius: 50%;
`;

