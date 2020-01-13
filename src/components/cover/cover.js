import React from "react"
import { Link } from "gatsby"
import { Wrapper, Avatar } from "./styles"

export default ({ children }) => (
  <div>
    <Wrapper>
      <Avatar />
      <div>
        {children}
      </div>
    </Wrapper>
  </div>
)