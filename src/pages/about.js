import React from 'react';
import { Helmet } from 'react-helmet';

import Layout from '../components/layout/layout';
import {
  AboutTitle,
  AboutContainer,
  AboutBody
} from '../styles/styles';

export default () => {
  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>About - Vinicius Costa</title>
        <link rel="canonical" href="https://vcsilva.com/" />
      </Helmet>
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
  );
}