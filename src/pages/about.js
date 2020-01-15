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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur suscipit nihil quae hic iure esse debitis facere, veritatis reprehenderit. Nesciunt itaque nostrum magnam! Vel ab, repellat deleniti vitae magnam aliquam?
          Hey.
        </AboutBody>

      </AboutContainer>
    </Layout>
  )
}