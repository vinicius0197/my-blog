import React from "react"
import { Helmet } from "react-helmet"

import Layout from "../components/layout/layout"

export default () => {
  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Contact - Vinicius Costa</title>
        <link rel="canonical" href="https://vcsilva.com/" />
      </Helmet>
      <div style={{ fontSize: "0.9em" }}>
        <div>Find me at: </div>
        <div>
          <a href="https://github.com/vinicius0197">Github</a>
        </div>
        <div>
          <a href="https://www.linkedin.com/in/viniciuscostasilva/">LinkedIn</a>
        </div>
      </div>
    </Layout>
  )
}
