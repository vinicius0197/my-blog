import React from 'react';

import PostListCard from '../PostListCard/';

const PostsList = ({ postEdges }) => {
  return postEdges.map(({ node }) => {
    return <PostListCard key={node.fields.slug} {...node} />
  });
};

export default PostsList;