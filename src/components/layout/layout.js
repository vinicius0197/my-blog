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

const Footer = styled.footer`
  font-size: 0.9rem;
  display: flex;

`;


export default ({ children }) => (
  <BaseLayout>
    <div>
      <NavContainer>
        <Navbar>
          <Link
            to="/"
          >
            <TitleBar>Vinicius Costa</TitleBar>
          </Link>
          <LinkList>
            <Link
              to="/about/"
            >
              <Item>About</Item>
            </Link>

            <Link
              to="/posts/"
            >
              <Item>Posts</Item>
            </Link>

            <Link
              to="/contact/"
            >
              <Item>Contact</Item>
            </Link>
          </LinkList>
        </Navbar>
      </NavContainer>
        {children}
    </div>

    <Footer>
      <LinkList>
        <Item>Newsletter</Item>
        <Item>RSS</Item>
        <Item>Patreon</Item>
      </LinkList>
    </Footer>
  </BaseLayout>
)