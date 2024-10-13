import React from 'react';
import { Link } from 'react-router-dom';

const getPostsWithRandomImages = (posts) => {
  return posts.map(post => ({
    ...post,
    randomSelectedImage: post.images[Math.floor(Math.random() * post.images.length)],
  }));
};

const PostGallery = ({ posts }) => {

  const postsWithRandomImages = getPostsWithRandomImages(posts);  

  const firstLetterCap = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1); 
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-24">  
      {postsWithRandomImages.map((post, index) => (
        <div key={index} className="p-1">
        <Link to={`/post/${post.id}`}>
          <div className="w-full aspect-w-1 aspect-h-1">
            <img src={post.randomSelectedImage.thumbnailUrl} alt={post.title} className="object-cover w-full h-full rounded"/>
          </div>
        </Link>
        <Link to={`/post/${post.id}`}>
          <p className="text-sm hover:text-blue-600 transition-colors">
            {post.title.length > 60 ? `${firstLetterCap(post.title).substring(0, 40)}...` : firstLetterCap(post.title)}
          </p>
        </Link>
      </div>
      ))}
    </div>
  );
};

export default PostGallery;