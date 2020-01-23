import React from "react"
import Layout from "../components/layout/layout"
import styled from 'styled-components'

const AboutTitle = styled.h2`
  color: #111;
`;

const AboutContainer = styled.div`
  margin-top: 2rem;
`;

const AboutBody = styled.div`
  display: block;
  color: #404040;
`;

export default () => {
  return (
    <Layout>
      <AboutContainer>
        <AboutTitle>About me</AboutTitle>

        <AboutBody>
          <p>
          Hello! My name is Vinicius Costa and I'm a software developer. I currently study Computer Science at University of Brasilia
          and work on cool side-projects that I would like to share here.
          </p>

          <p>
          I'm starting this blog as a way to document my learnings in software and some other cool stuff that I care about. I think that
          writing about things makes you better understand your own thought process, and it's also a good way to document one's own
          knowledge and teach things.

          </p>

          <p>
          I will be updating this section once I've done more stuff here. That's it for now!

          </p>



        </AboutBody>

      </AboutContainer>
    </Layout>
  )
}