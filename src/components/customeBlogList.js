import React from 'react';
import { useBlogList } from '@docusaurus/theme-common';
// import BlogListItem from '@theme/BlogListItem';

export default function CustomBlogList() {
  const { blogPosts } = useBlogList();

  return (
    <div>
      <h1>自定义博客列表</h1>
      <div>
        {blogPosts.map((post) => (
          <dev key={post.metadata.permalink} post={post} />
        ))}
      </div>
    </div>
  );
}