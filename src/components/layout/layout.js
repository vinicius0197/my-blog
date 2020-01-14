import React from "react"
import { Link } from "gatsby"
import {BaseLayout} from "./styles"
import styled from 'styled-components'

const TitleBar = styled.h3`
  padding: 0.2rem;
  cursor: pointer;
  color: #333;
  &:hover {
    color: #111;
  }
`;

const NavContainer = styled.nav`
  display: block;
  padding-top: 1rem;
`;

const Navbar = styled.nav`
  padding-top: 0.5rem;
  height: 3rem;
  padding-top: 0.4rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const LinkList = styled.ul`
  list-style-type: none;
  display: flex;
  margin-top: 0px;
  flex-direction: row;
`;

const Item = styled.li`
  padding: 0 0.9rem;
  cursor: pointer;
  color: rgba(0,0,0,.45);
  &:hover {
    color: #111;
  }
`;

export default ({ children }) => (
  <BaseLayout>
    <NavContainer>
      <Navbar>
        <TitleBar>Vinicius Costa</TitleBar>
        <LinkList>
          <Item>About</Item>
          <Item>Posts</Item>
          <Item>Contact</Item>
        </LinkList>
      </Navbar>
    </NavContainer>
      {children}
  </BaseLayout>
)