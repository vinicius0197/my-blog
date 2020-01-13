import React from "react"
import Layout from "../components/layout/layout"
import { Title } from "./styles"
import Wrapper from "../components/cover/cover"
import { About } from "../components/cover/styles"

export default () => (
  <Layout>
    <Wrapper>
      <Title>Hi, I'm Vinicius</Title>
      <About>I'm a software developer and blah blah blah blah blah blah blah blah blah <a href="link">Open Source</a></About>
    </Wrapper>
  </Layout>
)