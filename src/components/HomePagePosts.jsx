import React from 'react';
import { Link } from 'react-router-dom';

// In our case the count var is designed to be only for 1 and 2. But the method is dynamical. For that it has and the extra checks.
const getRandomImages = (images, count) => {
  const availableImages = [...images];
  const selectedImages = [];
  const limit = Math.min(count, images.length); // It is not needed in our case, because the HomePage make this check
  for (let i = 0; i < limit; i++) {
    const randomIndex = Math.floor(Math.random() * availableImages.length);
    selectedImages.push(availableImages[randomIndex]); 
    availableImages.splice(randomIndex, 1);
  }
  console.log( 'getRandomImages',getRandomImages );
  return selectedImages;
};

const HomePagePosts = ({ post, imageCount }) => {

  const randomImages = getRandomImages(post.images, imageCount);

  return (
    <div className="my-16">
      <div className={`grid ${imageCount === 2 ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
        {randomImages.map((image, index) => (
          <Link to={`/post/${post.id}`} key={index}>
            <img src={image.url} alt={post.title} className="w-full h-auto rounded-md hover:opacity-80 transition-opacity" />
          </Link>
        ))}
      </div>
      <p className="mt-8 text-gray-600 w-full md:w-[70%] mx-auto">{post.body.length > 500 ? `${post.body.substring(0, 480)}...` : post.body}</p>
    </div>
  );
};

export default HomePagePosts;