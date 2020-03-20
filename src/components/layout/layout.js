import React from 'react';
import { Link } from 'gatsby';

import {
  BaseLayout,
  TitleBar,
  NavContainer,
  Navbar,
  LinkList,
  Item,
  Footer
} from '../../styles/styles';

export default ({ children }) => (
  <BaseLayout>
    <div style={ { width: '100%' } }>
      <NavContainer>
        <Navbar>
          <Link
            to="/"
          >
            <TitleBar>Vinicius Costa</TitleBar>
          </Link>
          <LinkList>
            <Link
              to="/about"
            >
              <Item>About</Item>
            </Link>

            <Link
              to="/posts"
            >
              <Item>Posts</Item>
            </Link>

            <Link
              to="/contact"
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
      <a href="https://mailchi.mp/f0a801736282/viniciuscosta">
        <Item>Newsletter</Item>
      </a>
        <a
          href="/rss.xml"
        >
          <Item>RSS</Item>
        </a>
      </LinkList>
    </Footer>
  </BaseLayout>
)