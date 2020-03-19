import React from 'react';

import {
  Wrapper,
  Avatar
} from '../../styles/styles';

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