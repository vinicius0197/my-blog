import React from 'react';

import {
  Wrapper,
  Avatar
} from '../../styles/styles';

export default ({ children }) => (
  <div>
    <Wrapper>
      <Avatar />
      <div style={{ width: '85%' }}>
        {children}
      </div>
    </Wrapper>
  </div>
)