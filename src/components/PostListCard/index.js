import React from 'react';
import { Link } from 'gatsby';
import {
  SinglePost,
  PostTitle,
  PostDate,
} from '../../styles/styles';

const PostsListCard = ({ frontmatter, fields, excerpt }) => {
  const title = frontmatter.title || fields.slug;

  return(
    <Link
      to={`/${fields.slug}/`}
    >
      <SinglePost>
        <PostTitle>
          {title} - <PostDate> {frontmatter.date} </PostDate>
        </PostTitle>
      </SinglePost>
    </Link>
  );
};

export default PostsListCard;